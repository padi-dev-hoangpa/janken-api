// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

/**
 * approve
 * @param {String} tokenId
 */
const approve = async (tokenId) => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT
  const jankenContractAddress = process.env.JANKEN_CONTRACT
  console.log(jankenContractAddress)

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    approve: {
      spender: jankenContractAddress,
      token_id: tokenId
    }
  }
  console.log(handleMsg)
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = approve
