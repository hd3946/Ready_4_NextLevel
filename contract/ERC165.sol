// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC165.sol";

contract ERC165 is IERC165 {
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    mapping(bytes4 => bool) private _supportedInterfaces;

    constructor () {
        _registerInterface(_INTERFACE_ID_ERC165);
    }

    function supportsInterface(bytes4 interfaceId) override public view returns (bool) {
        return _supportedInterfaces[interfaceId];
    }

    /* internal functions */
    
    function _registerInterface(bytes4 interfaceId) internal {
        require(interfaceId != 0xffffffff, "ERC165: invalid interface id");

        _supportedInterfaces[interfaceId] = true;
    }
}
