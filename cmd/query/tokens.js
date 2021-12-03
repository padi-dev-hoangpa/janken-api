// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const tokens = async () => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, contractAddress)

  const queryMsg = {
    tokens: {
      owner: client.senderAddress
    }
  }
  const response = await executor.query(queryMsg)
  console.log('response: ', JSON.stringify(response))
}

tokens()
