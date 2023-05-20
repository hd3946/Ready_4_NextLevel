// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./presets/ERC1155PresetMinterPauser.sol";
import "./extensions/ERC1155Burnable.sol";
import "./extensions/ERC1155URIStorage.sol";
import "./extensions/ERC1155Mintable.sol";
import "./extensions/ERC1155Burnable.sol";
import "./ERC1155MetadataMintable.sol";
import "./OwnerRole.sol";
import "./Base64.sol"; 

contract BasicToken is  ERC1155Burnable, ERC1155URIStorage, ERC1155PresetMinterPauser, ERC1155Mintable, ERC1155MetadataMintable, OwnerRole { 
    string private _contractURI;

    constructor (address payable owner, string memory name, string memory symbol) ERC1155PresetMinterPauser(symbol, name) 
                                                                                  OwnerRole(owner) {
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Mintable, ERC1155PresetMinterPauser)
        returns (bool)
    {
        return
            ERC1155.supportsInterface(interfaceId);
    }

    /* admin function */
    
    function setContractMetadata(string memory contractMetadata) public onlyOwner() {
        _contractURI = string(abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        contractMetadata
                    )
                )
            ));
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function setURI(uint256 tokenId, string memory tokenURI) public onlyOwner() {
        _setURI(tokenId, tokenURI);
    }

    function setBaseURI(string memory baseURI) public onlyOwner() {
        _setBaseURI(baseURI);
    }

    /* override functions */

    function _setURI(uint256 tokenId, string memory tokenURI) internal override(ERC1155Mintable, ERC1155URIStorage) {
        ERC1155URIStorage._setURI(tokenId, tokenURI);
    }

    function _setBaseURI(string memory baseURI) internal override(ERC1155Mintable, ERC1155URIStorage){
        ERC1155URIStorage._setBaseURI(baseURI); 
    }

    function uri(uint256 tokenId) public view override(ERC1155, ERC1155PresetMinterPauser, ERC1155Mintable, ERC1155URIStorage) returns (string memory) {
        return ERC1155URIStorage.uri(tokenId);
    }

    function create(uint256 id, uint256 initialSupply, string memory uri) public override(ERC1155Mintable) returns (bool) {
        return ERC1155Mintable.create(id, initialSupply, uri);
    }

    function mintBatch(address to, uint256[] memory tokenIds, uint256[] memory amounts) public override(ERC1155Mintable) {
        ERC1155Mintable.mintBatch(to, tokenIds, amounts);
    }

    function burn(address to, uint256 tokenId, uint256 amount) public override(ERC1155Burnable) {
        ERC1155Burnable.burn(to, tokenId, amount);
    }

    function burnBatch(address to, uint256[] memory tokenIds, uint256[] memory amounts) public override(ERC1155Burnable) {
        ERC1155Burnable.burnBatch(to, tokenIds, amounts);
    }

    function pause() public override(ERC1155PresetMinterPauser) {
        ERC1155PresetMinterPauser.pause();
    }

    function unpause() public override(ERC1155PresetMinterPauser) {
        ERC1155PresetMinterPauser.unpause();
    }

    function _beforeTokenTransfer(address operator,address from,address to,uint256[] memory ids,uint256[] memory amounts,bytes memory data) internal override(ERC1155, ERC1155PresetMinterPauser) {
        ERC1155PresetMinterPauser._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

}
