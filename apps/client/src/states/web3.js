import Web3 from "web3"
import ABI from "../../../contract/contract"
import uuid from 'react-uuid'

let web3
let account
const ERC1155 = "0x2351512098b103289096ED876059b079d0a8D18C"

const contractAddress = '0x189B2FDF0ddaBcB95e8B271B8508411020bDbE20'

async function _with_gas(transaction) {
  const fee = await web3.eth.estimateGas(transaction);
  const gas_price = await web3.eth.getGasPrice();
  return Object.assign(transaction, { gasPrice: gas_price, gas: fee * 2 });
}

/** 메타마스크 로그인 함수  */
export const metaMaskLogin = async () => {
    const web3js = window.ethereum

    if (web3js) web3 = new Web3(window.ethereum)

    else if (window.confirm("Please install MetaMask to use this service.")) return window.open("https://metamask.io/download.html", "_blank")

    window.ethereum.enable()

    account = () => {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((err, accounts) => {
                if (err) reject(err)
                // console.log('dd', accounts)
                resolve(accounts[0]) 
            })
        })
    }
    // console.log('account', account())
    
}

/** 메타마스크 지갑에 연결 되 있는 상태이면 현재 주소를 가져오는 함수 */
async function getAccount() {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, accounts) => {
          if (err) reject(err)
          resolve(accounts[0])
      })
    })  
}

function getContract() {
  return new web3.eth.Contract(ABI, contractAddress)
}

/** 현재 메타마스크 지갑이랑 연동되 있는 계정 주소랑 현재 파라미터로 받은 주소와 일치하는 지 확인하는 함수 */
async function checkAccount () {
  const Account = await getAccount()

  if (Account.toLowerCase() !== account.toLowerCase) return false
  
  return true
}

// 숫자를 BN 객체로 변환하는 함수
function toBN(number) {
    return new web3.utils.BN(number);
}
// mintWithUriByTokenId(address token, uint256 tokenId, uint256 amount, uint256 signatureId, bytes memory signature)
async function mintWithUriByTokenId(token, tokenId, amount, signatureId, signature) {

  const account = await getAccount()

  const contract = await getContract()

  console.log('signatureId', signatureId, signature)

  return await web3.eth.sendTransaction(
    await _with_gas({
      from: account,
      to: contractAddress,
      data: web3.eth.abi.encodeFunctionCall({
          name: 'mintWithUriByTokenId',
          type: 'function',
          inputs: [
              { type: 'address', name: 'token' },
              { type: 'uint256', name: 'tokenId' },
              { type: 'uint256', name: 'amount' },
              { type: 'uint256', name: 'signatureId' },
              { type: 'bytes', name: 'signature' },
          ]
      }, [ token, tokenId, amount, signatureId, signature ])
    })
  )

}

/** 해당 컨트랙트에 appvoe 승인 개수를 확인하는 함수 */
export async function getAllowance() {
    await metaMaskLogin()
    const signatureId = '0x' + uuid().replace(/-/g, '');
    const account = await getAccount()
    console.log('account', account)
    const message = [
        "mintWithUriByTokenId",
        toBN(String(signatureId)),
        '0x2351512098b103289096ED876059b079d0a8D18C',
        String(account),
        toBN('10'),
        toBN('1')
    ]; 
    // console.log('signatureId', toBN(String(signatureId)))
    const data = web3.utils.soliditySha3({ type: 'bytes', value: encode_packed(message) })
    console.log('message', data)
    web3.eth.personal.sign(data, account)
    .then(async res => {
      console.log(res, 'signatureId')
        const result = await mintWithUriByTokenId(ERC1155, 10, 1, signatureId, res)
        console.log('\r\n', result)
      })
    .catch(error => {
      console.log('error', error)
    })
    // console.log('signature', signature, signatureId)
}

function encode_packed (values) {
    const BN = web3.utils.BN;
    return "0x" + values.map((value) => {
        if (typeof value === 'string') {
            if (value.substring(0, 2) === '0x') {
                return value.slice(2);
            } else {
                return web3.utils.toHex(value).slice(2);
            }
        }
  
        if (typeof value === 'number' || BN.isBN(value)) {
            return value.toString(16).replace(/^0x/, "").padStart(64, '0');
        }
  
        return "";
    }).join("");
  }

 export default web3
