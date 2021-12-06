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
  const jankenContractAddress = process.env.JANKEN_CONTRACT
  const snip721ContractAddress = process.env.SECRET_NFT_CONTRACT

  const executor = new Executor(client, jankenContractAddress)

  const codeHash = await client.getCodeHashByContractAddr(snip721ContractAddress)
  console.log('codeHash', codeHash)

  const handleMsg = {
    make_offer: {
      id: id,
      offeree: offereeAddress,
      offeror_nft_contract: snip721ContractAddress,
      offeror_nft: offerorTokenId,
      offeror_code_hash: codeHash,
      offeree_nft_contract: snip721ContractAddress,
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
