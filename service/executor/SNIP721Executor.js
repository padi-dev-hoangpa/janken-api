// @ts-check

const { Executor } = require('./Executor')

class SNIP721Executor extends Executor {
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
      response = await super.execute(handleMsg)
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
    return await super.query(queryMsg)
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
    return await super.query(queryMsg)
  }
}

module.exports = {
  SNIP721Executor
}
