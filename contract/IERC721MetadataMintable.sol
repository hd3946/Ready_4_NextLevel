// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract IERC721MetadataMintable {
    function mintWithTokenURI(address to, uint256 tokenId, string memory tokenURI) public virtual returns (bool);
    function mintWithTokenCID(address to, uint256 tokenId, string memory tokenCID) public virtual returns (bool);
    function setSpecifyEventTime(uint256 tokenId, uint256 specifyEventTime) public virtual;
}
