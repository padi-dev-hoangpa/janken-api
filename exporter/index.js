const initClient = require('./client')

const main = async () => {
  const client = await initClient()
  console.log(client)
}

main()
