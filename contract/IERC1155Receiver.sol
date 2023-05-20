// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC165.sol";

abstract contract IERC1155Receiver is IERC165 {

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external virtual returns (bytes4);

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external virtual returns (bytes4);

    
}
