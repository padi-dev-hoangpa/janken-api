const ApiService = require('../../../service/ApiService')
const { OrmWrapper } = require('../../../service/orm/OrmWrapper')

const orm = new OrmWrapper()
const service = new ApiService(null, null, orm)

describe('API Service', () => {
  test('fetchAllNFTs()', async () => {
    const NFTs = await service.fetchAllNFTs()

    expect(NFTs.length).toBe(3)
    expect(NFTs[0].tokenId).toBe('0001')
    expect(NFTs[0].owner).toBe('secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3')
    expect(NFTs[0].image).toBe('https://example.com/1')
  })
})
