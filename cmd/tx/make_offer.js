// @ts-check
const initClient = require('../../client/client')
const { Executor } = require('../../executor/executor')

const makeOffer = async () => {
  const client = await initClient()
  const contractAddress = process.env.JANKEN_CONTRACT

  console.log(contractAddress)

  const executor = new Executor(client, contractAddress)

  const codeHash = await client.getCodeHashByContractAddr(contractAddress)
  console.log('codeHash', codeHash)

  const handleMsg = {
    make_offer: {
      id: 3,
      offeree: 'secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv',
      offeror_nft_contract: contractAddress,
      offeror_nft: 'optional_ID_of_new_token_v3',
      offeror_code_hash: codeHash,
      offeree_nft_contract: contractAddress,
      offeree_nft: 'optional_ID_of_new_token_v11',
      offeree_code_hash: codeHash,
      offeror_hands: [1, 2, 3],
      offeror_draw_point: 2
    }
  }
  const response = await executor.execute(handleMsg)
  console.log('response: ', JSON.stringify(response))
}

makeOffer()
