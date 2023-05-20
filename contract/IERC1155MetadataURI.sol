// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC1155.sol";

abstract contract IERC1155MetadataURI is IERC1155 {
    function uri(uint256 id) public override virtual view returns (string memory);
}
