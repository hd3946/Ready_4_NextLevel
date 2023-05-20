// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC721Enumerable.sol";
import "./ERC721.sol";
import "./SafeMath.sol";

contract ERC721Enumerable is ERC721, IERC721Enumerable {
    using SafeMath for uint256;

    bytes4 private constant _INTERFACE_ID_ERC721_ENUMERABLE = 0x780e9d63;

    uint256[] private _allTokens;

    mapping(address => uint256[]) private _ownedTokens;
    mapping(uint256 => uint256) private _ownedTokensIndex;
    mapping(uint256 => uint256) private _allTokensIndex;

    constructor () {
        _registerInterface(_INTERFACE_ID_ERC721_ENUMERABLE);
    }

    function totalSupply() public override view returns (uint256) {
        return _allTokens.length;
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public override view returns (uint256) {
        require(index < balanceOf(owner), "ERC721Enumerable: owner index out of bounds");

        return _ownedTokens[owner][index];
    }

    function tokenByIndex(uint256 index) public override view returns (uint256) {
        require(index < totalSupply(), "ERC721Enumerable: global index out of bounds");

        return _allTokens[index];
    }

    /* override functions */

    function _transferFrom(address from, address to, uint256 tokenId) internal virtual override {
        super._transferFrom(from, to, tokenId);

        _removeTokenFromOwnerEnumeration(from, tokenId);
        _addTokenToOwnerEnumeration(to, tokenId);
    }

    function _mint(address to, uint256 tokenId, uint256 specifyEventTime) internal virtual override {
        super._mint(to, tokenId, specifyEventTime);

        _addTokenToOwnerEnumeration(to, tokenId);
        _addTokenToAllTokensEnumeration(tokenId);
    }

    function _burn(address owner, uint256 tokenId) internal virtual override {
        super._burn(owner, tokenId);

        _removeTokenFromOwnerEnumeration(owner, tokenId);
        _ownedTokensIndex[tokenId] = 0;

        _removeTokenFromAllTokensEnumeration(tokenId);
    }

    /* internal functions */

    function _tokensOfOwner(address owner) internal view returns (uint256[] storage) {
        return _ownedTokens[owner];
    }

    /* private functions */

    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        uint256 lastTokenIndex = _ownedTokens[from].length.sub(1);
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        _ownedTokens[from].pop();
    }

    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        uint256 lastTokenIndex = _allTokens.length.sub(1);
        uint256 tokenIndex = _allTokensIndex[tokenId];
        uint256 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        _allTokens.pop();
        _allTokensIndex[tokenId] = 0;
    }
}
