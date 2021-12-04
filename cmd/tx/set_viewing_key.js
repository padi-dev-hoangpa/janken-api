// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

const setViewingKey = async () => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, contractAddress)

  const handleMsg = {
    set_viewing_key: {
      key: '12345678'
    }
  }
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = setViewingKey
