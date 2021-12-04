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
    const q = { tokenId: tokenId }
    if (await this.getNFT(q) !== null) {
      throw new Error('tokenId is duplicated.')
    }
  }

  /**
   * postNFT
   * @param {Object} args
   */
  async postNFT (args) {
    await Nft.create({
      tokenId: args.tokenId,
      owner: args.input.owner,
      name: args.input.name,
      image: args.input.image,
      description: args.input.description
    })
  }
}

module.exports = {
  OrmWrapper
}
