var ChannelFactory = artifacts.require("ChannelFactory");


module.exports = function(deployer) {
  deployer.deploy(ChannelFactory);
};
