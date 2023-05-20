// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../utils/Context.sol";
import "../extensions/ERC1155Mintable.sol";
import "../extensions/ERC1155Burnable.sol";
import "../extensions/ERC1155Pausable.sol";
import "../access/AccessControlEnumerable.sol";
import "../ERC1155.sol";

contract ERC1155PresetMinterPauser is Context, ERC1155, AccessControlEnumerable, ERC1155Burnable, ERC1155Pausable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    string  private _name;
    string  private _symbol;

    constructor(string memory symbol_, string memory name_) {
        _name   = name_;
        _symbol = symbol_;
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, AccessControlEnumerable)
        returns (bool)
    {
        return
            interfaceId == type(AccessControlEnumerable).interfaceId ||
            ERC1155.supportsInterface(interfaceId);
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function uri(uint256 tokenId) public view virtual override(ERC1155) returns (string memory) {
        return ERC1155.uri(tokenId);
    }

    function pause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have pauser role to pause");
        _pause();
    }

    function unpause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have pauser role to unpause");
        _unpause();
    }


    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Pausable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
