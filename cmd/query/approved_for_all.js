// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

const NFTInfo = async () => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT
  console.log(contractAddress)

  const executor = new Executor(client, contractAddress)

  const queryMsg = {
    approved_for_all: {
      owner: process.argv[2],
      viewing_key: '12345678'
    }
  }
  const response = await executor.query(queryMsg)
  console.log('response: ', JSON.stringify(response))
}

NFTInfo()
