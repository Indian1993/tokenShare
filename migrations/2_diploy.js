var walletToken = artifacts.require("./walletToken.sol");  //what is artifact ?

module.exports = function(deployer) {
 //token price in ether
  deployer.deploy(walletToken,100)
};
