const { assert } = require("chai")

const TruffleTutorial = artifacts.require("./TruffleTutorial.sol")

require("chai")
  .use(require("chai-as-promised"))
  .should()

contract('TruffleTutorial', ([contractOwner, secondAddress, thirdAddress]) => {
  let truffleTutorial

  before(async () => {
    truffleTutorial = await TruffleTutorial.deployed()
  })

  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await truffleTutorial.address

      assert.notEqual(address, '')
      assert.notEqual(address, undefined)
      assert.notEqual(address, null)
      assert.notEqual(address, 0x0)
    })

    it('has a message', async () => {
      const message = await truffleTutorial.message()
      assert.equal(message, 'Hello World!')
    })
  })

  describe('message', () => {
    it('contract owner sets a message', async () => {
      // set new message
      await truffleTutorial.setMessage('Hi there!', { from: contractOwner })

      // check new message
      const message = await truffleTutorial.message()
      assert.equal(message, 'Hi there!')
    })

    it('address that is not the owner fails to set a message', async () => {
      await truffleTutorial.setMessage('Hi there!', { from: secondAddress })
        .should.be.rejected

      await truffleTutorial.setMessage('Hi there!', { from: thirdAddress })
      .should.be.rejected
    })
  })
})