const {
  GraphQLUpload
} = require('graphql-upload')

class Resolver {
  /**
   * Constructor
   * @param {ApiService} service
   */
  constructor (service) {
    this.service = service
  }

  init () {
    const resolvers = {
      Upload: GraphQLUpload,
      fetchAllNFTs: this.service.fetchAllNFTs,
      fetchNFT: this.service.fetchNFT,
      postMintNFT: this.service.postMintNFT.bind(this.service),
      postUploadImage: this.service.postUploadImage.bind(this.service)
    }
    return resolvers
  }
}

module.exports = Resolver
