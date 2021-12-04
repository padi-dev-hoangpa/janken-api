// @ts-check
const s3AvatarUploader = require('../graphql/s3')

/**
 * ApiService
 */
class ApiService {
  /**
   * @constructor
   * @param {import('./executor/Executor').Executor} executor
   * @param {import('./orm/OrmWrapper').OrmWrapper} orm
   */
  constructor (executor = null, orm) {
    this.executor = executor
    this.orm = orm
  }

  async postUploadImage (args) {
    const { createReadStream, filename, mimetype, encoding } = await args.file.file
    const uri = await s3AvatarUploader.upload(createReadStream(), {
      filename,
      mimetype
    })
    return {
      filename,
      mimetype,
      encoding,
      uri
    }
  }

  /**
   * postMintNFT
   * @param {Object} args
   */
  async postMintNFT (args) {
    const tokenID = Math.floor(Math.random() * 100)

    const handleMsg = {
      mint_nft: {
        token_id: tokenID.toString(),
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

    // TODO: add error handling
    const result = await this.executor.execute(handleMsg)
    return { txHash: result.transactionHash }
  }

  /**
   * fetchAllNFTs
   */
  async fetchAllNFTs () {
    return await this.orm.getNFTs()
  }

  /**
   * fetchNFT
   * @param {Object} args
   */
  async fetchNFT (args) {
    return await this.orm.getNFT(args)
  }

  /**
   * fetchNFTsByOwner
   * @param {Object} args
   */
  async fetchNFTsByOwner (args) {
    return await this.orm.getNFTsByOwner(args)
  }
}

module.exports = ApiService
