// @ts-check
require('dotenv').config()

const {
  EnigmaUtils,
  Secp256k1Pen,
  SigningCosmWasmClient,
  pubkeyToAddress,
  encodeSecp256k1Pubkey
} = require('secretjs')

const customFees = {
  upload: {
    amount: [{ amount: '5000000', denom: 'uscrt' }],
    gas: '5000000'
  },
  init: {
    amount: [{ amount: '500000', denom: 'uscrt' }],
    gas: '500000'
  },
  exec: {
    amount: [{ amount: '500000', denom: 'uscrt' }],
    gas: '500000'
  },
  send: {
    amount: [{ amount: '80000', denom: 'uscrt' }],
    gas: '80000'
  }
}

/**
 * @type {function(): Promise<SigningCosmWasmClient>}
 */
const initClient = async () => {
  const httpUrl = process.env.SECRET_REST_URL
  // Use key created in tutorial #2
  const mnemonic = process.env.MNEMONIC

  // A pen is the most basic tool you can think of for signing.
  // This wraps a single keypair and allows for signing.
  const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic).catch((err) => {
    throw new Error(`Could not get signing pen: ${err}`)
  })

  // Get the public key
  const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey)

  // get the wallet address
  const accAddress = pubkeyToAddress(pubkey, 'secret')

  // Initialize client
  const txEncryptionSeed = EnigmaUtils.GenerateNewSeed()

  const client = new SigningCosmWasmClient(
    httpUrl,
    accAddress,
    (signBytes) => signingPen.sign(signBytes),
    txEncryptionSeed,
    customFees
  )
  console.log('client account: ', client.senderAddress)
  return client
}

module.exports = initClient
