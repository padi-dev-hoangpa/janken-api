// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

const tokenApprovals = async (tokenId) => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, contractAddress)

  const queryMsg = {
    token_approvals: {
      token_id: tokenId,
      viewing_key: '12345678'
    }
  }
  const response = await executor.query(queryMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = tokenApprovals
