// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC165.sol";

abstract contract IERC1155 is IERC165 {
    function uri(uint256) public view virtual returns (string memory);
    function totalSupply(uint256 id) public view virtual returns (uint256);
    function balanceOf(address owner, uint256 id) public view virtual returns (uint256);
    function isTokenLocked(uint256 tokenId, address owner) public view virtual returns (uint256);
    function balanceOfBatch(address[] memory owners, uint256[] memory ids) public view virtual returns (uint256[] memory);
    function setApprovalForAll(address operator, bool approved) public virtual;
    function isApprovedForAll(address owner, address operator) public view virtual returns (bool);
    function symbol() public view virtual returns (string memory);
    function name() public view virtual returns (string memory) ;
    function safeTransferFrom( address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual;
    function safeBatchTransferFrom( address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual;
    function _safeTransferFrom( address from, address to, uint256 id, uint256 amount, bytes memory data) internal virtual;
    function _safeBatchTransferFrom( address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual;
    function setURI(string memory newuri) public virtual;
    function _mint( address to, uint256 id, uint256 amount, bytes memory data) internal virtual;
    function _mintBatch( address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual ;
    function _burn( address from, uint256 id, uint256 amount) internal virtual;
    function _burnBatch( address from, uint256[] memory ids, uint256[] memory amounts) internal virtual;
    function _setApprovalForAll( address owner, address operator, bool approve ) internal virtual;
    function _beforeTokenTransfer( address, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory) internal virtual ;
    function _afterTokenTransfer( address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual;
    function _doSafeTransferAcceptanceCheck( address operator, address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual;
    function _doSafeBatchTransferAcceptanceCheck( address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual;
    function _asSingletonArray(uint256 element) public pure virtual returns (uint256[] memory);
    function _checkOnERC1155Received( address operator, address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual returns (bool) ;
    function _checkOnERC1155BatchReceived( address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual returns (bool);
    
}
