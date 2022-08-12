const hre = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  const lockedAmount = hre.ethers.utils.parseEther("1");
  await deploy('Lock', {
    from: deployer,
    args: [unlockTime],
    log: true,
    value: lockedAmount,
  });
};
module.exports.tags = ['Lock'];

