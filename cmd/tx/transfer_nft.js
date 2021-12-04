// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/executor')

const transferNFT = async () => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    transfer_nft: {
      recipient: process.argv[2],
      token_id: process.argv[3]
    }
  }
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

transferNFT()
