// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract IERC721Receiver {
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) public virtual returns (bytes4);
}
