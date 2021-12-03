// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const transferNFT = async () => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    transfer_nft: {
      recipient: 'secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv',
      token_id: 'optional_ID_of_new_token_v1'
    }
  }
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

transferNFT()
