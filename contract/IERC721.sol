// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC165.sol";

abstract contract IERC721 is IERC165 {
    function balanceOf(address owner) public virtual view returns (uint256 balance);
    function ownerOf(uint256 tokenId) public virtual view returns (address owner);
    function approve(address to, uint256 tokenId) public virtual;
    function getApproved(uint256 tokenId) public virtual view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) public virtual;
    function isApprovedForAll(address owner, address operator) public virtual view returns (bool);
    function transferFrom(address from, address to, uint256 tokenId) public virtual;
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual;
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
}
