const TruffleTutorial = artifacts.require("TruffleTutorial");

module.exports = function(deployer) {
  deployer.deploy(TruffleTutorial);
};
