// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC721Enumerable.sol";
import "./ERC721MetadataMintable.sol";
import "./ERC721Burnable.sol";
import "./ERC721Pausable.sol";
import "./OwnerRole.sol";
import "./Base64.sol";

contract BasicToken is ERC721Enumerable, ERC721MetadataMintable,  ERC721Burnable, ERC721Pausable, OwnerRole {
    string private _contractURI;

    constructor (address payable owner, string memory name, string memory symbol) ERC721Metadata(name, symbol) 
                                                                                  OwnerRole(owner) {
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

    function setBaseTokenURI(string memory baseURI) public onlyOwner {
        _setBaseTokenURI(baseURI);
    }

    function setMetadataDelegate(address delegate) public onlyOwner {
        _setMetadataDelegate(delegate);
    }

    /* override functions */

    function approve(address to, uint256 tokenId) public override(ERC721, ERC721Pausable, IERC721) {
        ERC721Pausable.approve(to, tokenId);
    }

    function setApprovalForAll(address to, bool approved) public override(ERC721, ERC721Pausable, IERC721) {
        ERC721Pausable.setApprovalForAll(to, approved);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, ERC721Pausable, IERC721) {
        ERC721Pausable.transferFrom(from, to, tokenId);
    }

    function _transferFrom(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        ERC721Enumerable._transferFrom(from, to, tokenId);
    }

    function _mint(address to, uint256 tokenId, uint256 specifyEventTime) internal override(ERC721, ERC721Enumerable) {
        ERC721Enumerable._mint(to, tokenId, specifyEventTime);
    }

    function setSpecifyEventTime(uint256 tokenId, uint256 specifyEventTime) public override (ERC721, ERC721MetadataMintable) {
        ERC721MetadataMintable.setSpecifyEventTime(tokenId, specifyEventTime);
    }

    function _burn(address owner, uint256 tokenId) internal override(ERC721, ERC721Enumerable, ERC721Metadata) {
        ERC721Metadata._burn(owner, tokenId);
    }
}
