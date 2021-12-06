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
   */
  async executeMintNFT (args) {
    const handleMsg = {
      mint_nft: {
        token_id: args.tokenId,
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
      response = await this.execute(handleMsg)
    } catch (e) {
      throw new Error(`failed to mint NFT: ${e}`)
    }
    return { txHash: response.transactionHash }
  }

  /**
   * executeMintNFT
   * @param {Object} args
   */
  async executeMakeOffer (args) {
    const input = args.input
    const handleMsg = {
      make_offer: {
        id: input.id,
        offeree: input.offeree,
        offeror_nft_contract: input.offeror_nft_contract,
        offeror_nft: input.offeror_nft,
        offeror_code_hash: input.offeror_code_hash,
        offeree_nft_contract: input.offeree_nft_contract,
        offeree_nft: input.offeree_nft,
        offeree_code_hash: input.offeree_code_hash,
        offeror_hands: input.offeror_hands,
        offeror_draw_point: input.offeror_draw_point
      }
    }
    this.contractAddress = process.env.JANKEN_CONTRACT
    let response
    try {
      response = await this.execute(handleMsg)
    } catch (e) {
      throw new Error(`failed to mint NFT: ${e}`)
    }
    return { txHash: response.transactionHash }
  }
}

module.exports = {
  Executor
}
