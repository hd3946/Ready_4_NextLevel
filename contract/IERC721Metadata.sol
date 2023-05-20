// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC721.sol";

abstract contract IERC721Metadata is IERC721 {
    function name() public virtual view returns (string memory);
    function symbol() public virtual view returns (string memory);
    function tokenURI(uint256 tokenId) public virtual view returns (string memory);
}
