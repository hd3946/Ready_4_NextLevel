// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC165.sol";

abstract contract IERC20 is IERC165 {
    function totalSupply() virtual public view returns (uint256);
    function balanceOf(address account) virtual public view returns (uint256);
    function transfer(address recipient, uint256 amount) virtual public returns (bool);
    function allowance(address owner, address spender) virtual public view returns (uint256);
    function approve(address spender, uint256 amount) virtual public returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) virtual public returns (bool);
    function safeTransfer(address recipient, uint256 amount) virtual public;
    function safeTransfer(address recipient, uint256 amount, bytes memory data) virtual public;
    function safeTransferFrom(address sender, address recipient, uint256 amount, bytes memory data) virtual public;
    function safeTransferFrom(address sender, address recipient, uint256 amount) virtual public;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
