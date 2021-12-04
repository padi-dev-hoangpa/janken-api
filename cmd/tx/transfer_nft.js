// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

const transferNft = async (recipient, tokenId) => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    transfer_nft: {
      recipient: recipient,
      token_id: tokenId
    }
  }
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = transferNft
