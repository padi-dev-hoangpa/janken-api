// @ts-check

class Executor {
  /**
   * @constructor
   * @param {import('secretjs').SigningCosmWasmClient} client
   * @param {string} contractAddress
   */
  constructor (client, contractAddress) {
    this.client = client
    this.contractAddress = contractAddress
  }

  /**
   * execute
   * @param {Object} handleMsg
   */
  async execute (handleMsg) {
    const response = await this.client.execute(this.contractAddress, handleMsg)
    console.log('res:', response)
    return response
  }

  /**
   * query
   * @param {Object} queryMsg
   */
  async query (queryMsg) {
    const response = await this.client.queryContractSmart(this.contractAddress, queryMsg)
    return response
  }
}

module.exports = {
  Executor
}
