const { OrmWrapper } = require('../../../service/orm/OrmWrapper')

const orm = new OrmWrapper()

describe('Orm Wrapper', () => {
  test('getAllNFTOwners()', async () => {
    const NFTs = await orm.getAllNFTOwners()

    expect(NFTs.length).toBe(2)
    expect(NFTs[0].owner).toBe('secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3')
    expect(NFTs[1].owner).toBe('secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv')
  })
})
