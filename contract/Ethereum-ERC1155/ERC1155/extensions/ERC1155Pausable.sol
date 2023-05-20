// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.2) (token/ERC1155/extensions/ERC1155Pausable.sol)

pragma solidity ^0.8.0;

import "../ERC1155.sol";
import "./Pausable.sol";

abstract contract ERC1155Pausable is ERC1155, Pausable {

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        require(!paused(), "ERC1155Pausable: token transfer while paused");
    }
}
