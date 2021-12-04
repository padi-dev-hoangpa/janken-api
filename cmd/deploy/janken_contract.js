// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

/**
 * jankenDeploy
 */
const jankenDeploy = async () => {
  const client = await initClient()
  const executor = new Executor(client)

  const wasmPATH = './wasm/janken.wasm'
  const initMsg = {}
  const contractName = `My Janken${Math.ceil(Math.random() * 10000)}`

  await executor.deploy(wasmPATH, initMsg, contractName)
}

module.exports = jankenDeploy
