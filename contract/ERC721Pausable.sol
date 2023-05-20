// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC721.sol";
import "./Pausable.sol";

abstract contract ERC721Pausable is ERC721, Pausable {
    bytes4 private constant _INTERFACE_ID_ERC721_PAUSABLE = 0x4d5507ff;

    constructor () {
        _registerInterface(_INTERFACE_ID_ERC721_PAUSABLE);
    }

    function approve(address to, uint256 tokenId) public virtual override whenNotPaused {
        super.approve(to, tokenId);
    }

    function setApprovalForAll(address to, bool approved) public virtual override whenNotPaused {
        super.setApprovalForAll(to, approved);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override whenNotPaused {
        super.transferFrom(from, to, tokenId);
    }
}
