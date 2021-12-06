// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

/**
 * acceptOffer
 * @param {Number} id
 */
const acceptOffer = async (id) => {
  const client = await initClient()
  const contractAddress = process.env.JANKEN_CONTRACT

  console.log(contractAddress)

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    accept_offer: {
      id: id,
      offeree_hands: [3, 1, 2]
    }
  }
  console.log(handleMsg)
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = acceptOffer
