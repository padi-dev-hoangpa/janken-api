// @ts-check
const { parseRawLog } = require('./logs')
const initClient = require('./client')

const main = async () => {
  const client = await initClient()

  const q = { id: '0662CF0B35A9CE3D25E5101F0CC783EA8B6047C9670315B22AB482737A91323A' }
  // const q = { height: 141454 }
  const txs = await client.searchTx(q)
    .catch((e) => {
      throw new Error(`failed to get txs: ${e}`)
    })

  console.log(txs)
  for (const tx of txs.values()) {
    console.log(tx.rawLog)

    const log = parseRawLog(tx.rawLog)
    console.log(log)
  }
}

main()
