// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC721Burnable.sol";
import "./ERC721.sol";

contract ERC721Burnable is ERC721, IERC721Burnable {
    bytes4 private constant _INTERFACE_ID_ERC721_BURNABLE = 0x42966c68;

    constructor () {
        _registerInterface(_INTERFACE_ID_ERC721_BURNABLE);
    }

    function burn(uint256 tokenId) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721Burnable: caller is not owner nor approved");

        _burn(tokenId);
    }
}
