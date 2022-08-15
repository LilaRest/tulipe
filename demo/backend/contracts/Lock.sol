// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;
    int public specialNumber = 8;
    int[] public numbersList;
    uint public constant constantsList = 963;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(payable(msg.sender) == owner, "You must be the owner.");
        _;
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        //require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function raiseWithdrawEvent() public {
        emit Withdrawal(address(this).balance, block.timestamp);
    }

    function setSpecialNumber (int newSpecialNumber)
        public 
        payable
        onlyOwner
    {
        require(msg.value > 0.5 ether, "To set the special number you must pay at least 0.5 ETH.");
        specialNumber = newSpecialNumber;
        numbersList.push(specialNumber);
    }

    function returnConstant (int a) pure public returns(int) {
        return a * 2;
    }
}
