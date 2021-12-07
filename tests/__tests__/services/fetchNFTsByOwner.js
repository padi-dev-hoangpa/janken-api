const ApiService = require('../../../service/ApiService')
const { OrmWrapper } = require('../../../service/orm/OrmWrapper')

const orm = new OrmWrapper()
const service = new ApiService(null, null, orm)

describe('API Service', () => {
  test('fetchNFTsByOwner()', async () => {
    const q = { owner: 'secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3' }
    const NFTs = await service.fetchNFTsByOwner(q)

    expect(NFTs.length).toBe(2)
    expect(NFTs[0].tokenId).toBe('0001')
    expect(NFTs[0].owner).toBe('secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3')
    expect(NFTs[0].image).toBe('https://example.com/1')
  })
})
