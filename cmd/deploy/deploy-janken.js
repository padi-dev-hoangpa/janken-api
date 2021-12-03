// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const main = async () => {
  const client = await initClient()
  const contractAddress = process.env.SECRET_NFT_CONTRACT
  const executor = new Executor(client, contractAddress)

  const wasmPATH = './janken.wasm'
  const initMsg = {}
  const contractName = `My Janken${Math.ceil(Math.random() * 10000)}`

  await executor.deploy(wasmPATH, initMsg, contractName)
}

main().catch((err) => {
  console.error(err)
})
