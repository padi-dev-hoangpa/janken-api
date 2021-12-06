'use strict'

const jankenDeploy = require('./janken_contract')
const nftDeploy = require('./nft_contract')
const commander = require('commander')

/**
 * makeDeployCommand
 */
function makeDeployCommand () {
  const deploy = new commander
    .Command('deploy')
    .alias('d')

  deploy
    .command('janken')
    .action(() => {
      console.log('===janken deploy===')
      jankenDeploy().catch((e) => { console.log(e) })
    })

  deploy
    .command('snip721')
    .action(() => {
      console.log('===snip721 deploy===')
      nftDeploy().catch((e) => { console.log(e) })
    })

  return deploy
}

module.exports = makeDeployCommand
