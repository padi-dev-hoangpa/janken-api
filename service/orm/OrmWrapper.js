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
