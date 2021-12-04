// @ts-check
const { Nft } = require('../../models')

/**
 * OrmWrapper
 */
class OrmWrapper {
  /**
   * getNFT
   */
  async getNFT () {
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
   */
  async getNFTsByOwner () {
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
