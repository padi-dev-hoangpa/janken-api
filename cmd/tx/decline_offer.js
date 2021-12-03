// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const acceptOffer = async () => {
  const client = await initClient()
  const contractAddress = process.env.JANKEN_CONTRACT

  console.log(contractAddress)

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    decline_offer: {
      id: Number(process.argv[2])
    }
  }
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

acceptOffer()
