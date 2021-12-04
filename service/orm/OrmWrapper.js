// @ts-check
const { Nft } = require('../../models')

/**
 * OrmWrapper
 */
class OrmWrapper {
  /**
   * getNFT
   * @param {Object} args ex: { tokenId: '0001' }
   */
  async getNFT (args) {
    const NFT = await Nft.findOne({
      where: {
        tokenId: args.tokenId
      }
    })
    return NFT
  }

  /**
   * getNFTs
   */
  async getNFTs () {
    const NFTs = await Nft.findAll({})
    return NFTs
  }

  /**
   * getNFTsByOwner
   * @param {Object} args ex: { owner: 'secret...' }
   */
  async getNFTsByOwner (args) {
    const NFTs = await Nft.findAll({
      where: {
        owner: args.owner
      }
    })
    return NFTs
  }

  /**
   * checkIfTokenIDIsUnique
   * @param {String} tokenId
   * @throws {string} tokenId should be unique
   */
  async checkIfTokenIDIsUnique (tokenId) {
    if (this.getNFT(tokenId) === null) {
      throw new Error('tokenId is duplicated.')
    }
  }

  /**
   * postNFT
   */
  async postNFT () {
  }
}

module.exports = {
  OrmWrapper
}
