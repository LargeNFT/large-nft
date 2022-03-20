// contracts/ChannelFactory.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Context.sol";


import "./Channel.sol";



contract ChannelFactory is Context {

    Channel[] public channelAddresses;

    event ChannelCreated(Channel channel);

    constructor() public {}

    function createChannel(string name, string symbol, uint256 mintFee, address feeRecipient) external {

        //Create channel
        Channel channel = new Channel(name, symbol, mintFee, feeRecipient);

        //Transfer ownership to calling wallet
        channel.transferOwnership(_msgSender());

        //Add to the list of channels
        channelAddresses.push(channel);

        emit ChannelCreated(channel);
    }

}
