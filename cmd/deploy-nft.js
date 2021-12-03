// @ts-check
const initClient = require('../client/client')
const fs = require('fs')

const main = async () => {
  const client = await initClient()
  const wasm = fs.readFileSync('../snip721.wasm')
  console.log('Uploading contract')
  const uploadReceipt = await client.upload(wasm, {}).catch((err) => {
    throw new Error(`Could not upload contract: ${err}`)
  })

  console.log('uploadReceipt', JSON.stringify(uploadReceipt))

  // Get the code ID from the receipt
  const { codeId } = uploadReceipt
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
  const contract = await client
    .instantiate(
      codeId,
      initMsg,
      `My Snip721${Math.ceil(Math.random() * 10000)}`
    )
    .catch((err) => {
      throw new Error(`Could not instantiate contract: ${err}`)
    })
  const { contractAddress } = contract

  console.log('contract: ', JSON.stringify(contract), 'address:', contractAddress)
}

main().catch((err) => {
  console.error(err)
})
