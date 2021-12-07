// @ts-check
const { Nft, Offer } = require('../../models')
const { Op } = require('sequelize')

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
   * getAllNFTOwners
   */
  async getAllNFTOwners () {
    const owners = await Nft.findAll({
      group: 'owner'
    })
      .catch((e) => { throw new Error(`fail to find owners list: ${e}`) })

    return owners
  }

  /**
   * updateNFTOwner
   * @param {String} tokenId
   * @param {String} owner
   */
  async updateNFTOwner (tokenId, owner) {
    const q = { tokenId: tokenId }
    const NFT = await this.getNFT(q)
    if (NFT === null) {
      throw new Error('this tokenId is not in DB')
    }
    NFT.owner = owner
    await NFT.save()
      .catch((e) => { throw new Error(`fail to update NFT Owner: ${e}`) })
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

    return OFFER
  }

  /**
   * postOffer
   * @param {Object} args
   */
  async postOffer (args) {
    const input = args.input
    console.log(input)
    await Offer.create({
      offerId: input.offerId,
      offeror: input.offeror,
      offeree: input.offeree,
      status: 'REQUEST',
      offereeNftContract: process.env.SECRET_NFT_CONTRACT,
      offereeNft: input.offereeNFTTokenId,
      offerorNftContract: process.env.SECRET_NFT_CONTRACT,
      offerorNft: input.offerorNFTTokenId,
      offerorHands: JSON.stringify(input.offerorHands),
      drawPoint: input.drawPoint,
      winner: ''
    })
      .catch((e) => { throw new Error(`fail to post OFFER: ${e}`) })
  }

  /**
   * getOffers
   * @param {Object} args ex: { address: 'secret...' }
   */
  async getOffers (args) {
    const offers = await Offer.findAll({
      where: {
        [Op.or]: [
          { offeror: args.address },
          { offeree: args.address }
        ]
      }
    })
      .catch((e) => { throw new Error(`fail to find offers: ${e}`) })

    return offers
  }

  /**
   * updateOffer
   * @param {Object} offer
   */
  async updateOffer (offer) {
    await offer.save()
      .catch((e) => { throw new Error(`fail to update Offer: ${e}`) })
  }
}

module.exports = {
  OrmWrapper
}
