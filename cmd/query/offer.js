// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

/**
 * offer
 * @param {Number} id
 */
const offer = async (id) => {
  const client = await initClient()
  const contractAddress = process.env.JANKEN_CONTRACT

  const executor = new Executor(client, contractAddress)

  const queryMsg = {
    offer: {
      id: id,
      address: client.senderAddress
    }
  }
  const response = await executor.query(queryMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = offer
