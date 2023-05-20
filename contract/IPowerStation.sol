// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IPowerStation {
    function consumePower(address owner, uint256 amount) external;
    function getPowerScore(address account) external view returns (uint256);
    function getPowerAmount(address account) external view returns (uint256);
}
