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
      fetchAllNFT: this.service.fetchAllNFT,
      postMintNFT: this.service.postMintNFT.bind(this.service),
      postUploadImage: this.service.postUploadImage.bind(this.service)
    }
    return resolvers
  }
}

module.exports = Resolver
