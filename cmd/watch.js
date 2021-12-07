const { JankenExecutor } = require('../service/executor/JankenExecutor')
const { SNIP721Executor } = require('../service/executor/SNIP721Executor')
const { OrmWrapper } = require('../service/orm/OrmWrapper')
const initClient = require('../client/client')
const jankenContractAddress = process.env.JANKEN_CONTRACT
const snip721ContractAddress = process.env.SECRET_NFT_CONTRACT
const Service = require('../service/ApiService.js')
const sleep = require('../utils/sleep')

const main = async () => {
  const client = await initClient()
  const jankenExecutor = new JankenExecutor(client, jankenContractAddress)
  const snip721Executor = new SNIP721Executor(client, snip721ContractAddress)
  const orm = new OrmWrapper()
  const service = new Service(jankenExecutor, snip721Executor, orm)

  while (true) {
    try {
      await service.postPollingNFTOwners()
    } catch (e) {
      console.error('error - polling NFT owners: ', e)
    }
    console.log('sleeping...')
    await sleep(10 * 1000)
  }
}

main()
