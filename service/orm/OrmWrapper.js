// @ts-check
const { Nft, Offer } = require('../../models')

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
      .catch((e) => { throw new Error(`fail to find NFT: ${e}`) })
    return NFT
  }

  /**
   * getNFTs
   */
  async getNFTs () {
    const NFTs = await Nft.findAll({})
      .catch((e) => { throw new Error(`fail to find NFTs: ${e}`) })
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
      .catch((e) => { throw new Error(`fail to find NFTs By Owner: ${e}`) })
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
      .catch((e) => { throw new Error(`fail to post NFT: ${e}`) })
  }

  /**
   * checkIfIDIsUnique
   * @param {String} offerId
   * @throws {string} id should be unique
   */
   async checkIfOfferIDIsUnique (offerId) {
    const q = { offerId: offerId }
    if (await this.getOffer(q) !== null) {
      throw new Error('Id is duplicated.')
    }
  }

  /**
   * getOffer
   * @param {Object} args ex: { id: '0001' }
   */
  async getOffer (args) {
    const OFFER = await Offer.findOne({
      where: {
        offerId: args.offerId
      }
    })
      .catch((e) => { throw new Error(`fail to find offer: ${e}`) })

    console.log(OFFER)
    return OFFER
  }

  /**
   * postOffer
   * @param {Object} args
   */
   async postOffer (args) {
    const input = args.input
    await Offer.create({
      offerId: input.id,
      offeree: input.offeree,
      status: "REQUEST",
      offereeNftContract: input.offeror_nft_contract,
      offereeNft: input.offeree_nft,
      offerorNftContract: input.offeror_nft_contract,
      offerorNft: input.offeror_nft,
      offereeHands: JSON.stringify(args.offeror_hands),
      drawPoint: input.offeror_draw_point,
      winner: ''
    })
      .catch((e) => { throw new Error(`fail to post OFFER: ${e}`) })
  }
}

module.exports = {
  OrmWrapper
}
