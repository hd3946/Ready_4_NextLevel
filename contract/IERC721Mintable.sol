// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract IERC721Mintable {
    function mint(address to, uint256 tokenId) public virtual returns (bool);
}
