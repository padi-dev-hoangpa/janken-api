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
    await queryInterface.bulkInsert('offers', wrap([
      { offer_id: 1, status: 'Offered', offeror: 'secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3', offeror_nft_contract: 'secret1e3wu5pwrdyw6n6zleqr9yqrnaakxghdk07txr0', offeror_nft: '0001', offeror_hands: '[1, 2, 3]', offeree: 'secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv', offeree_nft_contract: 'secret1e3wu5pwrdyw6n6zleqr9yqrnaakxghdk07txr0', offeree_nft: '0002', offeree_hands: '[2, 1, 3]', draw_point: 2, winner: '' },
      { offer_id: 2, status: 'Offered', offeror: 'secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv', offeror_nft_contract: 'secret1e3wu5pwrdyw6n6zleqr9yqrnaakxghdk07txr0', offeror_nft: '0001', offeror_hands: '[1, 2, 3]', offeree: 'secret19398wwp6yksvthgczcw9upphsx4qnx9hnu69l3', offeree_nft_contract: 'secret1e3wu5pwrdyw6n6zleqr9yqrnaakxghdk07txr0', offeree_nft: '0002', offeree_hands: '[2, 1, 3]', draw_point: 2, winner: '' },
      { offer_id: 3, status: 'Declined', offeror: 'secret1nu08s5qkc8x4z4fg727hz24n54578tulyr9jul', offeror_nft_contract: 'secret1e3wu5pwrdyw6n6zleqr9yqrnaakxghdk07txr0', offeror_nft: '0001', offeror_hands: '[1, 2, 3]', offeree: 'secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv', offeree_nft_contract: 'secret1e3wu5pwrdyw6n6zleqr9yqrnaakxghdk07txr0', offeree_nft: '0002', offeree_hands: '[2, 1, 3]', draw_point: 2, winner: '' }
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
