// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract IERC165 {
    function supportsInterface(bytes4 interfaceId) virtual public view returns (bool);
}
