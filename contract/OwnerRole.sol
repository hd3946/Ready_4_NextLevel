// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract OwnerRole {
    address payable private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == _owner, "OwnerRole: caller is not owner");
        _;
    }

    constructor(address payable owner) {
        _owner = owner;
    }

    function isOwner(address account) public view returns (bool) {
        return (account == _owner);
    }

    function renounceOwnership() public onlyOwner {
        _transferOwnership(payable(address(0)));
    }

    function transferOwnership(address payable newOwner) public onlyOwner {
        require(newOwner != address(0), "OwnerRole: new owner is the zero address");
        require(newOwner != _owner, "OwnerRole: already is the owner");

        _transferOwnership(newOwner);
    }

    /* internal functions */

    function _transferOwnership(address payable newOwner) public onlyOwner {
        _owner = newOwner;

        emit OwnershipTransferred(_owner, newOwner);
    }
}
