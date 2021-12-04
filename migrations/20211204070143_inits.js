const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "nfts", deps: []
 * createTable() => "offers", deps: []
 * addIndex(nfts_onwer_indexes) => "nfts"
 * addIndex(offers_offeror_indexes) => "offers"
 * addIndex(offers_offeree_indexes) => "offers"
 *
 */

const info = {
  revision: 1,
  name: "inits",
  created: "2021-12-04T07:01:43.050Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "nfts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        token_id: { type: Sequelize.STRING(191), field: "token_id" },
        owner: { type: Sequelize.STRING(191), field: "owner" },
        name: { type: Sequelize.STRING(191), field: "name" },
        image: { type: Sequelize.STRING(191), field: "image" },
        description: { type: Sequelize.STRING(191), field: "description" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "offers",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        offer_id: { type: Sequelize.INTEGER, field: "offer_id" },
        status: { type: Sequelize.STRING(191), field: "status" },
        offeror: { type: Sequelize.STRING(191), field: "offeror" },
        offeror_nft_contract: {
          type: Sequelize.STRING(191),
          field: "offeror_nft_contract",
        },
        offeror_nft: { type: Sequelize.STRING(191), field: "offeror_nft" },
        offeror_hands: { type: Sequelize.STRING(191), field: "offeror_hands" },
        offeree: { type: Sequelize.STRING(191), field: "offeree" },
        offeree_nft_contract: {
          type: Sequelize.STRING(191),
          field: "offeree_nft_contract",
        },
        offeree_nft: { type: Sequelize.STRING(191), field: "offeree_nft" },
        offeree_hands: { type: Sequelize.STRING(191), field: "offeree_hands" },
        draw_point: { type: Sequelize.INTEGER, field: "draw_point" },
        winner: { type: Sequelize.STRING(191), field: "winner" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "nfts",
      ["owner"],
      {
        indexName: "nfts_onwer_indexes",
        name: "nfts_onwer_indexes",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "offers",
      ["offeror"],
      {
        indexName: "offers_offeror_indexes",
        name: "offers_offeror_indexes",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "offers",
      ["offeree"],
      {
        indexName: "offers_offeree_indexes",
        name: "offers_offeree_indexes",
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["nfts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["offers", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
