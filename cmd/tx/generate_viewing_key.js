// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

/**
 * generateViewingKey
 */
const generateViewingKey = async () => {
  const client = await initClient()
  const contractAddress = process.env.JANKEN_CONTRACT

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    generate_viewing_key: {
      entropy: 'entropy_source'
    }
  }
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = generateViewingKey
