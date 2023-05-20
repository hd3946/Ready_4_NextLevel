// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC721.sol";

abstract contract IERC721Enumerable is IERC721 {
    function totalSupply() public virtual view returns (uint256);
    function tokenOfOwnerByIndex(address owner, uint256 index) public virtual view returns (uint256);
    function tokenByIndex(uint256 index) public virtual view returns (uint256);
}
