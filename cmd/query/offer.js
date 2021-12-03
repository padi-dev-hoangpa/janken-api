// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const offer = async () => {
  const client = await initClient()
  const contractAddress = process.env.JANKEN_CONTRACT

  const executor = new Executor(client, contractAddress)

  const queryMsg = {
    offer: {
      id: Number(process.argv[2])
    }
  }
  const response = await executor.query(queryMsg)
  console.log('response: ', JSON.stringify(response))
}

offer()
