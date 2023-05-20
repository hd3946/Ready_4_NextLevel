// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../ERC1155.sol";
import "./ERC1155URIStorage.sol";
import "./IERC1155Mintable.sol"; 
import "../MinterRole.sol";

abstract contract ERC1155Mintable is ERC1155, ERC1155URIStorage, IERC1155Mintable, MinterRole {
    // bytes32 public constant MINTER_ROLE = keccak256("ERC1155_MINTER_ROLE");

    mapping(uint256 => address) public creators;

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155)
        returns (bool)
    {
        return
            interfaceId == type(IERC1155Mintable).interfaceId ||
            ERC1155.supportsInterface(interfaceId);
    }

    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return ERC1155URIStorage.uri(tokenId);
    }

    function create(
        uint256 id,
        uint256 initialSupply,
        string memory uri_
    ) public virtual override onlyMinter returns (bool) {
        require(!_exists(id), "ERC1155: token already created");

        creators[id] = _msgSender();

        _mint(_msgSender(), id, initialSupply, "");

        if (bytes(uri_).length > 0) {
            _tokenURIs[id] = uri_;
            emit URI(uri_, id);
        }
        return true;
    }

    function mint(
        uint256 id,
        address to,
        uint256 amount
    ) public virtual override onlyMinter {
        // require(!_exists(id), "ERC1155: token already created");
        // require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155: must have minter role to mint");
        ERC1155._mint(to, id, amount, "");
    }

    function mint(
        uint256 id,
        address[] memory toList,
        uint256[] memory amounts
    ) public virtual override onlyMinter {
        // require(!_exists(id), "ERC1155: token already created");
        // require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155: must have minter role to mint");
        require(toList.length == amounts.length, "ERC1155: toList and amounts length mismatch");
        for (uint256 i = 0; i < toList.length; ++i) {
            address to = toList[i];
            uint256 amount = amounts[i];
            ERC1155._mint(to, id, amount, "");
        }
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public virtual override onlyMinter {
        for (uint256 i = 0; i < ids.length; ++i) {
            // require(!_exists(ids[i]), "ERC1155: token already created");
        }
        // require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155: must have minter role to mint");
        ERC1155._mintBatch(to, ids, amounts, "");
    }

    function _exists(uint256 id) internal view returns (bool) {
        address creator = creators[id];
        return creator != address(0);
    }

    function _setURI(uint256 tokenId, string memory tokenURI) internal virtual override(ERC1155URIStorage) onlyMinter {
        ERC1155URIStorage._setURI(tokenId, tokenURI);
    }

    function _setBaseURI(string memory baseURI) internal virtual override(ERC1155URIStorage) onlyMinter {
        ERC1155URIStorage._setBaseURI(baseURI);
    }

    function specifyEventTime(uint256[] calldata tokenIds, uint256[] memory specifyTime) public onlyMinter {
        require(tokenIds.length == specifyTime.length, "Invalid input lengths");
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(tokenIds[i] != 0, "Invalid token ID");

            ERC1155.timedToken[tokenIds[i]] = specifyTime[i];
        }
    }


}
