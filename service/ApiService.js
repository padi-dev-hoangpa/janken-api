// @ts-check
const { Executor } = require('../executor/executor')
const s3AvatarUploader = require('../graphql/s3')

/**
 * ApiService
 * @extends Executor
 */
class ApiService extends Executor {
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
    const result = await super.execute(handleMsg)
    return { txHash: result.transactionHash }
  }

  /**
   * fetchAllNFT
   */
  async fetchAllNFT () {
    return [{
      owner: 'aaa',
      image: 'aaa',
      name: 'aaa',
      description: 'aaa'
    }]
  }
}

module.exports = ApiService
