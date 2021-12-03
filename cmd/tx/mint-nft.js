// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const mintNFT = async () => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    mint_nft: {
      token_id: 'optional_ID_of_new_token_v4',
      owner: client.senderAddress,
      public_metadata: {
        extension: {
          image: 'image_url',
          name: 'mytoken',
          description: 'testtesttest'
        }
      }

    }
  }
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

mintNFT()
