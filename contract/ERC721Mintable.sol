// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC721Mintable.sol";
import "./ERC721.sol";
import "./MinterRole.sol";

abstract contract ERC721Mintable is ERC721, IERC721Mintable, MinterRole {
    bytes4 private constant _INTERFACE_ID_ERC721_MINTABLE = 0xeab83e20;

    constructor () {
        _registerInterface(_INTERFACE_ID_ERC721_MINTABLE);
    }

    function mint(address to, uint256 tokenId, uint256 specifyEventTime) public onlyMinter returns (bool) {
        _mint(to, tokenId, specifyEventTime);

        return true;
    }
}
