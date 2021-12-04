// @ts-check
const fs = require('fs')

class Executor {
  /**
   * @constructor
   * @param {import('secretjs').SigningCosmWasmClient} client
   * @param {string} contractAddress
   */
  constructor (client, contractAddress = '') {
    this.client = client
    this.contractAddress = contractAddress
  }

  /**
   * deploy
   * @param {String} wasmPATH
   * @param {Object} initMsg
   * @param {String} contractName
   */

  async deploy (wasmPATH, initMsg, contractName) {
    const wasm = fs.readFileSync(wasmPATH)
    console.log('Uploading contract')
    const uploadReceipt = await this.client.upload(wasm, {}).catch((err) => {
      throw new Error(`Could not upload contract: ${err}`)
    })

    console.log('uploadReceipt', JSON.stringify(uploadReceipt))

    // Get the code ID from the receipt
    const { codeId } = uploadReceipt
    const contract = await this.client.instantiate(
      codeId,
      initMsg,
      contractName
    )
      .catch((err) => {
        throw new Error(`Could not instantiate contract: ${err}`)
      })

    const { contractAddress } = contract

    console.log('contract: ', JSON.stringify(contract), 'address:', contractAddress)
  }

  /**
   * execute
   * @param {Object} handleMsg
   */
  async execute (handleMsg) {
    const response = await this.client.execute(this.contractAddress, handleMsg)
    console.log('res:', response)
    return response
  }

  /**
   * query
   * @param {Object} queryMsg
   */
  async query (queryMsg) {
    const response = await this.client.queryContractSmart(this.contractAddress, queryMsg)
    return response
  }

  /**
   * executeMintNFT
   * @param {Object} args
   * @param {String} tokenId
   */
  async executeMintNFT (args, tokenId) {
    const handleMsg = {
      mint_nft: {
        token_id: tokenId,
        owner: args.input.owner,
        public_metadata: {
          extension: {
            image: args.input.image,
            name: args.input.name,
            description: args.input.description
          }
        }
      }
    }

    let response
    try {
      response = await this.client.execute(this.contractAddress, handleMsg)
    } catch (e) {
      throw new Error('failed to mint NFT')
    }
    return { txHash: response.transactionHash }
  }
}

module.exports = {
  Executor
}
