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
      .catch((e) => { throw new Error(`fail to execute Msg: ${e}`) })
    console.log('res:', response)
    return response
  }

  /**
   * query
   * @param {Object} queryMsg
   */
  async query (queryMsg) {
    const response = await this.client.queryContractSmart(this.contractAddress, queryMsg)
      .catch((e) => { throw new Error(`fail to query Msg: ${e}`) })
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
   * queryTokens
   * @param {String} owner
   */
  async queryTokens (owner) {
    const queryMsg = {
      tokens: {
        owner: owner
      }
    }
    return await this.query(queryMsg)
  }

  /**
   * queryAllNftInfo
   * @param {String} tokenId
   */
  async queryAllNftInfo (tokenId) {
    const queryMsg = {
      all_nft_info: {
        token_id: tokenId
      }
    }
    return await this.query(queryMsg)
  }

  /**
   * queryOffer
   * @param {Number} offerId
   */
  async queryOffer (offerId) {
    const queryMsg = {
      offer: {
        id: offerId,
        address: 'secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3'
      }
    }
    console.log(queryMsg)
    return await this.query(queryMsg)
  }
}

module.exports = {
  Executor
}
