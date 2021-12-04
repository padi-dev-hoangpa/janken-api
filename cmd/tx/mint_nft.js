// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

const mintNft = async (owner) => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, contractAddress)
  const tokenID = `tokenID${Math.ceil(Math.random() * 10000)}`

  const handleMsg = {
    mint_nft: {
      token_id: tokenID,
      owner: owner,
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

module.exports = mintNft
