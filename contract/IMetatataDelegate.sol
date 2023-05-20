// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract IMetatataDelegate {
    function getTokenURI(string memory tokenCID) public virtual view returns (string memory);
}
