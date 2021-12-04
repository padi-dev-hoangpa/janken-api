'use strict'

const wrap = require('../db/utils/wrapValuesWithDateTime.js')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('nfts', wrap([
      { token_id: '0001', owner: 'secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3', name: 'nft-721-0001', image: 'https://example.com/1', description: 'hello world 1' },
      { token_id: '0002', owner: 'secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv', name: 'nft-721-0002', image: 'https://example.com/2', description: 'hello world 2' },
      { token_id: '0003', owner: 'secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3', name: 'nft-721-0003', image: 'https://example.com/3', description: 'hello world 3' }
    ]), {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
