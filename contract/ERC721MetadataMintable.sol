// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC165.sol";
import "./ERC721Metadata.sol";
import "./MinterRole.sol";

abstract contract ERC721MetadataMintable is ERC721Metadata, MinterRole {
    bytes4 private constant _INTERFACE_ID_ERC721_METADATA_MINTABLE = 0xfac27f46;

    constructor () {
        _registerInterface(_INTERFACE_ID_ERC721_METADATA_MINTABLE);
    }

    function mintWithTokenURI(address to, uint256 tokenId, uint256 specifyEventTime, string memory tokenURI) public onlyMinter returns (bool) {
        _mint(to, tokenId, specifyEventTime);
        _setTokenURI(tokenId, tokenURI);

        return true;
    }
    
    function mintWithTokenCID(address to, uint256 tokenId, uint256 specifyEventTime, string memory tokenCID) public onlyMinter returns (bool) {
        _mint(to, tokenId, specifyEventTime);
        _setTokenCID(tokenId, tokenCID);

        return true;
    }

    function setSpecifyEventTime(uint256 tokenId, uint256 specifyEventTime) public virtual override onlyMinter {
        setSpecifyEventTime(tokenId, specifyEventTime);
    }
}
