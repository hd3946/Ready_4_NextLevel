// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC721.sol";
import "./ERC165.sol";
import "./SafeMath.sol";
import "./Address.sol";
import "./Counters.sol";

contract ERC721 is ERC165, IERC721 {
    using SafeMath for uint256;
    using Address for address;
    using Counters for Counters.Counter;

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd; /* IERC721 */
    bytes4 private constant _ERC721_RECEIVED    = 0x150b7a02; /* onERC721Received(address,address,uint256,bytes) */

    mapping (uint256 => address) private _tokenOwner;
    mapping (uint256 => address) private _tokenApprovals;
    mapping (address => Counters.Counter) private _ownedTokensCount;
    mapping (address => mapping (address => bool)) private _operatorApprovals;
    mapping (uint256 => uint256) private _timedToken;

    constructor () {
        _registerInterface(_INTERFACE_ID_ERC721);
    }

    function balanceOf(address owner) public override view returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");

        return _ownedTokensCount[owner].current();
    }

    function ownerOf(uint256 tokenId) public override view returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");

        return owner;
    }

    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _tokenApprovals[tokenId] = to;

        emit Approval(owner, to, tokenId);
    }

    function getApproved(uint256 tokenId) public override view returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address to, bool approved) public virtual override {
        require(to != msg.sender, "ERC721: approve to caller");

        _operatorApprovals[msg.sender][to] = approved;
        
        emit ApprovalForAll(msg.sender, to, approved);
    }

    function isApprovedForAll(address owner, address operator) public override view returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");

        _transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override {
        transferFrom(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    function getSpecifyEventTime(uint256 tokenId) public view returns(uint256) {
        return _timedToken[tokenId];
    }

    function setSpecifyEventTime(uint256 tokenId, uint256 specifyEventTime) public virtual {
        _timedToken[tokenId] = specifyEventTime;
    }

    /* internal functions */

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];

        return (owner != address(0));
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ownerOf(tokenId);

        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    function _mint(address to, uint256 tokenId, uint256 specifyEventTime) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to].increment();
        _timedToken[tokenId] = specifyEventTime;

        emit Transfer(address(0), to, tokenId);
    }

    function _burn(address owner, uint256 tokenId) internal virtual {
        require(ownerOf(tokenId) == owner, "ERC721: burn of token that is not own");

        _clearApproval(tokenId);

        _ownedTokensCount[owner].decrement();
        _tokenOwner[tokenId] = address(0);

        emit Transfer(owner, address(0), tokenId);
    }

    function _burn(uint256 tokenId) internal virtual {
        _burn(ownerOf(tokenId), tokenId);
    }

    function _transferFrom(address from, address to, uint256 tokenId) internal virtual {
        require(ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");
        require(_timedToken[tokenId] == 0, "Token unlock time remaining.");
        require(_timedToken[tokenId] > block.timestamp, "Transactions are possible after the end of the event");

        _clearApproval(tokenId);

        _ownedTokensCount[from].decrement();
        _ownedTokensCount[to].increment();

        _tokenOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function _clearApproval(uint256 tokenId) private {
        if (_tokenApprovals[tokenId] != address(0)) {
            _tokenApprovals[tokenId] = address(0);
        }
    }

    /*  */

    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory data) internal returns (bool) {
        bool success; 
        bytes memory retval;

        if (!to.isContract()) {
            return true;
        }

        // Logic for compatibility with ERC721.
        (success, retval) = to.call(
            abi.encodeWithSelector(_ERC721_RECEIVED, msg.sender, from, tokenId, data)
        );
        if (retval.length != 0 && abi.decode(retval, (bytes4)) == _ERC721_RECEIVED) {
            return true;
        }
        
        return false;
    }
}
