// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./SafeMath.sol";

library Counters {
    using SafeMath for uint256;

    struct Counter {
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        counter._value += 1; // For saving gas, do not use SafeMath
    }

    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}
