// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

const NftInfo = async (tokenId) => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT
  console.log(contractAddress)

  const executor = new Executor(client, contractAddress)

  const queryMsg = {
    nft_info: {
      token_id: tokenId
    }
  }
  const response = await executor.query(queryMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = NftInfo
