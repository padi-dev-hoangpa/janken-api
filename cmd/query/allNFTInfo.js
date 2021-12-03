// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const allNFTInfo = async () => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT
  console.log(contractAddress)

  const executor = new Executor(client, contractAddress)

  const queryMsg = {
    all_nft_info: {
      token_id: 'optional_ID_of_new_token_v1'
    }
  }
  const response = await executor.query(queryMsg)
  console.log('response: ', JSON.stringify(response))
}

allNFTInfo()
