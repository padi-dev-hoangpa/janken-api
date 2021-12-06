// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../service/executor/Executor')

/**
 * makeOffer
 * @param {Number} id
 * @param {String} offereeAddress
 * @param {String} offerorTokenId
 * @param {String} offereeTokenId
 */
const makeOffer = async (id, offereeAddress, offerorTokenId, offereeTokenId) => {
  const client = await initClient()
  const contractAddress = process.env.JANKEN_CONTRACT

  console.log(contractAddress)

  const executor = new Executor(client, contractAddress)

  const codeHash = await client.getCodeHashByContractAddr(contractAddress)
  console.log('codeHash', codeHash)

  const handleMsg = {
    make_offer: {
      id: id,
      offeree: offereeAddress,
      offeror_nft_contract: contractAddress,
      offeror_nft: offerorTokenId,
      offeror_code_hash: codeHash,
      offeree_nft_contract: contractAddress,
      offeree_nft: offereeTokenId,
      offeree_code_hash: codeHash,
      offeror_hands: [1, 2, 3],
      offeror_draw_point: 2
    }
  }
  console.log(handleMsg)
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

module.exports = makeOffer
