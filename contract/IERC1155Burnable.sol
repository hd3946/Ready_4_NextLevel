// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

abstract contract IERC1155Burnable {
    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) public virtual;

    function burnBatch(
        address account,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) public virtual;
}
