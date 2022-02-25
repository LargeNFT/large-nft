// contracts/mock/MockBaseballs.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

// import "../util/console.sol";


contract MockBaseballs  {
    
    uint256 public totalSupply;
    // uint256 public balance;

    mapping(address => uint256) public balances;

    constructor() {
        balances[msg.sender] =      1000000000000000000000; // 1000
        totalSupply = 10000000000000000000000; //10000
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return balances[account];
    }
    


}