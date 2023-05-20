// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC721Metadata.sol";
import "./IMetatataDelegate.sol";
import "./ERC721.sol";
import "./OwnerRole.sol";

contract ERC721Metadata is ERC721, IERC721Metadata {
    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;

    string  private _name;
    string  private _symbol;
    string  private _baseTokenURI;
    address private _metadataDelegate;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => string) private _tokenCIDs;

    constructor (string memory name_, string memory symbol_) {
        _name   = name_;
        _symbol = symbol_;

        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
    }

    function name() public override view returns (string memory) {
        return _name;
    }

    function symbol() public override view returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId) public override view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory tokenCID = _tokenCIDs[tokenId];

        if (bytes(tokenCID).length != 0) {
            if (_metadataDelegate != address(0)) {
                return IMetatataDelegate(_metadataDelegate).getTokenURI(tokenCID);
            }

            return string(abi.encodePacked(_baseTokenURI, tokenCID));
        }

        return _tokenURIs[tokenId];
    }

    /* internal functions */

    function _setBaseTokenURI(string memory baseURI) internal {
        _baseTokenURI = baseURI;
    }

    function _setMetadataDelegate(address delegate) internal {
        _metadataDelegate = delegate;
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");

        _tokenURIs[tokenId] = uri;
    }

    function _setTokenCID(uint256 tokenId, string memory cid) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");

        _tokenCIDs[tokenId] = cid;
    }

    /* override functions */

    function _burn(address owner, uint256 tokenId) internal virtual override {
        super._burn(owner, tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function setSpecifyEventTime(uint256 tokenId, uint256 specifyEventTime) public virtual override {
        setSpecifyEventTime(tokenId, specifyEventTime);
    }
}
