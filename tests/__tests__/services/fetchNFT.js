const ApiService = require('../../../service/ApiService')
const { OrmWrapper } = require('../../../service/orm/OrmWrapper')

const orm = new OrmWrapper()
const service = new ApiService(null, orm)

describe('API Service', () => {
  test('fetchNFT()', async () => {
    const q = { tokenId: '0001' }
    const NFT = await service.fetchNFT(q)

    expect(NFT.tokenId).toBe('0001')
    expect(NFT.owner).toBe('secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3')
    expect(NFT.image).toBe('https://example.com/1')
  })
})
