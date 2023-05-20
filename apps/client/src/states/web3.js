import Web3 from "web3"
import ABI from "../../../contract/contract"
import uuid from 'react-uuid'

let web3
let account

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

/** 해당 컨트랙트에 appvoe 승인 개수를 확인하는 함수 */
export async function getAllowance() {
    metaMaskLogin()
    const signatureId = '0x' + uuid().replace(/-/g, '');
    const message = [
        "mintWithUriByTokenId",
        toBN(String(signatureId)),
        '0x2351512098b103289096ED876059b079d0a8D18C',
        account,
        toBN('7'),
        toBN('1')
    ]; 
    // console.log('signatureId', toBN(String(signatureId)))
    const data = await web3.utils.soliditySha3({ type: 'bytes', value: encode_packed(message) })
    console.log('message', data)
    web3.eth.sign(data)
    .then(console.log)
    .catch(console.log)
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

/** 컨트랙트 반환 함수 */
function getContract(ABI, contractAddress,) {
  return new web3.eth.Contract(ABI, contractAddress)
}

/** 해당 토큰 컨트랙트애 approve 수행하는 함수 */
export const setApprove = async (account, contractAddress, tokenAddress, amount) => {

  if (! (await checkAccount())) return alert('Please check your account!')
  
  const contract = getContract(tokenABI, tokenAddress)

  const allowance = await getAllowance(account, contractAddress, tokenAddress)

  if (allowance >= amount) return alert('You already approved this amount!')
  
  const approveLimit = await contract.methods.setApprove(contractAddress, amount).estimateGas({ from: account })
  
  // address token, uint256 tokenId, uint256 amount, uint256 signatureId, bytes memory signature

  await contract.methods.mintWithUriByTokenId(contractAddress, amount)
        .send({
          from: account,
          gas: approveLimit
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt', receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) window.alert('Transaction is confirmed!')
        })
        .on('error', (error) => {
          window.alert(error.message)
        })

}

/** MultiTransfer 토큰 및 최소 이체금액 지정 함수 */
export const setTransferCondition = async (account, contractAddress, tokenAddress, minimumAmount) => {
    
    if (! (await checkAccount())) return alert('Please check your account!')

    const contract = getContract(ABI, contractAddress)

    const conditionLimit = await contract.methods.setTransferCondition(tokenAddress, minimumAmount).estimateGas({ from: account })

    await contract.methods.setTransferCondition(tokenAddress, minimumAmount)
          .send({ 
            from: account, 
            gas: conditionLimit 
          })
          .on('transactionHash', (hash) => {
            console.log('transactionHash', hash)
          })
          .on('receipt', (receipt) => {
            console.log('receipt', receipt)
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            if (confirmationNumber === 0) window.alert('Transaction is confirmed!')
          })
          .on('error', (error) => {
            if (error.includes('caller does not have the Minter role')) window.alert('please check your Minter role!')
            else window.alert('Transaction is failed!')
          })
}

/** 토큰 전송 함수 (같은 금액으로 여러주소의 에어드랍) */
export const transfer = async (account, contractAddress, amount, recipiemts) => {

  if (! (await checkAccount())) return alert('Please check your account!')

  const contract = getContract(ABI, contractAddress)

  const transferLimit = await contract.methods.transfer(amount, recipiemts).estimateGas({ from: account })

  await contract.methods.transfer(amount, recipiemts)
        .send({
          from: account,
          gas: transferLimit
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt', receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) window.alert('Transaction is confirmed!')
        })
        .on('error', (error) => {
          window.alert(error.message)
        })
}

/** 토큰 전송 함수 (여러 금액으로 여러주소의 에어드랍) */
export const multiTransfer = async (account, contractAddress, amounts, recipiemts) => {

  if (! (await checkAccount())) return alert('Please check your account!')

  const contract = getContract(ABI, contractAddress)

  const transferLimit = await contract.methods.transfer(amounts, recipiemts).estimateGas({ from: account })

  await contract.methods.transfer(amounts, recipiemts)
        .send({
          from: account,
          gas: transferLimit
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt', receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) window.alert('Transaction is confirmed!')
        })
        .on('error', (error) => {
          window.alert(error.message)
        })
}

/** 카이카스 지갑 연동 */
export const klaytnLogin = async (account) => {

    if (window.klaytn && window.klaytn.isKaikas) {
        const accounts = await window.klaytn.enable()
        account = accounts[0]
    } else if(window.confirm("Please install Kaikas wallet!")) return window.open("https://metamask.io/download.html", "_blank")
  
}

/** 클레이튼 실시간 가스 가격 도출 함수 */
export const getKlayGasPrice = async () => {
    return new Promise((resolve, reject) => {
        caver.rpc.klay.getGasPrice((err, gasPrice) => {
            if (err) reject(err)
            resolve(gasPrice)
        })
    })
} 

/** 카이카스 지갑에 연결 되 있는 상태이면 현재 주소를 가져오는 함수 */
async function getKlayAccount() {
  return new Promise((resolve, reject) => {
    caver.klay.getAccounts
      .then((accounts) => {
        resolve(accounts[0])
      })
      .catch((error) => {
        reject(error)
      })
  })  
}

/** 현재 카이카스 지갑이랑 연동되 있는 계정 주소랑 현재 파라미터로 받은 주소와 일치하는 지 확인하는 함수 */
async function checkKlayAccount (account) {
  const Account = await getKlayAccount()

  if (Account.toLowerCase() !== account.toLowerCase) return false

  return true
}

/** 해당 컨트랙트에 appvoe 승인 개수를 확인하는 함수 */
async function getKlayAllowance(account, contractAddress, tokenAddress) {
  const contract = new caver.klay.Contract(tokenABI, tokenAddress)
  const allowance = await contract.methods.allowance(account, contractAddress).call({ from: account })
  return allowance
}

/** 해당 토큰 컨트랙트애 approve 수행하는 함수 */
export const setKlayApprove = async (account, contractAddress, tokenAddress, amount) => {

  if (! (await checkKlayAccount())) return alert('Please check your account!')
  
  const contract = new caver.klay.Contract(tokenABI, tokenAddress)

  const allowance = await getKlayAllowance(account, contractAddress, tokenAddress)

  if (allowance >= amount) return alert('You already approved this amount!')
  
  const approveLimit = await contract.methods.setApprove(contractAddress, amount).estimateGas({ from: account })

  const gasPrice = await getKlayGasPrice()

  await contract.methods.approve(contractAddress, amount)
        .send({
          from: account,
          gas: approveLimit,
          gasPrice: gasPrice
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt', receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) window.alert('Transaction is confirmed!')
        })
        .on('error', (error) => {
          window.alert(error.message)
        })

}

/** MultiTransfer 토큰 및 최소 이체금액 지정 함수 */
export const setKlayTransferCondition = async (account, contractAddress, tokenAddress, minimumAmount) => {
    
  if (! (await checkKlayAccount())) return alert('Please check your account!')

  const contract = new caver.klay.Contract(ABI, contractAddress)

  const conditionLimit = await contract.methods.setTransferCondition(tokenAddress, minimumAmount).estimateGas({ from: account })

  const gasPrice = await getKlayGasPrice()

  await contract.methods.setTransferCondition(tokenAddress, minimumAmount)
        .send({ 
          from: account, 
          gas: conditionLimit,
          gasPrice: gasPrice
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt', receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) window.alert('Transaction is confirmed!')
        })
        .on('error', (error) => {
          if (error.includes('caller does not have the Minter role')) window.alert('please check your Minter role!')
          else window.alert('Transaction is failed!')
        })
}

/** 토큰 전송 함수 (같은 금액으로 여러주소의 에어드랍) */
export const klayTransfer = async (account, contractAddress, amount, recipiemts) => {

  if (! (await checkKlayAccount())) return alert('Please check your account!')

  const contract = new caver.klay.Contract(ABI, contractAddress)

  const transferLimit = await contract.methods.transfer(amount, recipiemts).estimateGas({ from: account })

  const gasPrice = await getKlayGasPrice()

  await contract.methods.transfer(amount, recipiemts)
        .send({
          from: account,
          gas: transferLimit,
          gasPrice: gasPrice
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt', receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) window.alert('Transaction is confirmed!')
        })
        .on('error', (error) => {
          window.alert(error.message)
        })
}

/** 토큰 전송 함수 (여러 금액으로 여러주소의 에어드랍) */
export const klayMultiTransfer = async (account, contractAddress, amounts, recipiemts) => {

  if (! (await checkKlayAccount())) return alert('Please check your account!')

  const contract = new caver.klay.Contract(ABI, contractAddress)

  const transferLimit = await contract.methods.transfer(amounts, recipiemts).estimateGas({ from: account })

  const gasPrice = await getKlayGasPrice()

  await contract.methods.transfer(amounts, recipiemts)
        .send({
          from: account,
          gas: transferLimit,
          gasPrice: gasPrice
        })
        .on('transactionHash', (hash) => {
          console.log('transactionHash', hash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt', receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) window.alert('Transaction is confirmed!')
        })
        .on('error', (error) => {
          window.alert(error.message)
        })
}

 export default web3
