// @ts-check

const { Executor } = require('./Executor')

class JankenExecutor extends Executor {
  /**
   * queryOffer
   * @param {Number} offerId
   */
  async queryOffer (offerId) {
    const queryMsg = {
      offer: {
        id: offerId,
        address: this.client.senderAddress
      }
    }
    console.log(queryMsg)
    return await super.query(queryMsg)
  }
}

module.exports = {
  JankenExecutor
}
