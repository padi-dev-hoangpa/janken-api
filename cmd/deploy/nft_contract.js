// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

const nftDeploy = async () => {
  const client = await initClient()
  const executor = new Executor(client)

  const wasmPATH = './wasm/snip721.wasm'
  const initMsg = {
    /// name of token contract
    name: 'aaa',
    /// token contract symbol
    symbol: 'eee',
    /// entropy used for prng seed
    entropy: 'aaaaaaaa',
    /// optional privacy configuration for the contract
    config: {
      public_owner: true,
      public_token_supply: true
    }
  }

  const contractName = `My SNIP${Math.ceil(Math.random() * 10000)}`

  await executor.deploy(wasmPATH, initMsg, contractName)
}

module.exports = nftDeploy
