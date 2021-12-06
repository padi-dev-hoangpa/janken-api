'use strict'

const allNftInfo = require('./all_nft_info')
const approvedForAll = require('./approved_for_all')
const nftInfo = require('./nft_info')
const offer = require('./offer')
const tokenApprovals = require('./token_approvals')
const tokens = require('./tokens')

const commander = require('commander')

const myParseInt = require('../utils/parseInt')

/**
 * makeQueryCommand
 */
function makeQueryCommand () {
  const query = new commander
    .Command('query')
    .alias('q')

  query
    .command('all_nft_info')
    .argument('<token id>', 'token id')
    .action((tokenId) => {
      console.log('===query all_nft_info===')
      allNftInfo(tokenId).catch((e) => { console.log(e) })
    })

  query
    .command('approved_for_all')
    .argument('<owner>', 'owner address')
    .action((owner) => {
      console.log('===query approved_for_all===')
      approvedForAll(owner).catch((e) => { console.log(e) })
    })

  query
    .command('nft_info')
    .argument('<token id>', 'token id')
    .action((tokenId) => {
      console.log('===query nft_info===')
      nftInfo(tokenId).catch((e) => { console.log(e) })
    })

  query
    .command('token_approvals')
    .argument('<token id>', 'token id')
    .action((tokenId) => {
      console.log('===query tokens approvals===')
      tokenApprovals(tokenId).catch((e) => { console.log(e) })
    })

  query
    .command('offer')
    .argument('<id>', 'offer id', myParseInt)
    .action((id) => {
      console.log('===query offer===')
      offer(id).catch((e) => { console.log(e) })
    })

  query
    .command('tokens')
    .argument('<owner>', 'owner address')
    .action((owner) => {
      console.log('===query tokens===')
      tokens(owner).catch((e) => { console.log(e) })
    })

  return query
}

module.exports = makeQueryCommand
