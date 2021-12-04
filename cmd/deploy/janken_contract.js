// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const main = async () => {
  const client = await initClient()
  const executor = new Executor(client)

  const wasmPATH = './wasm/janken.wasm'
  const initMsg = {}
  const contractName = `My Janken${Math.ceil(Math.random() * 10000)}`

  await executor.deploy(wasmPATH, initMsg, contractName)
}

main().catch((err) => {
  console.error(err)
})
