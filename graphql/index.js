const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

// database
const schema = require('./schema')
const Resolver = require('./Resolver')
const Service = require('../service/ApiService.js')
const initClient = require('../client/client')
const { JankenExecutor } = require('../service/executor/JankenExecutor')
const { SNIP721Executor } = require('../service/executor/SNIP721Executor')
const { OrmWrapper } = require('../service/orm/OrmWrapper')
const jankenContractAddress = process.env.JANKEN_CONTRACT
const snip721ContractAddress = process.env.SECRET_NFT_CONTRACT

const { graphqlUploadExpress } = require('graphql-upload')

const main = async () => {
  const client = await initClient()
  const jankenExecutor = new JankenExecutor(client, jankenContractAddress)
  const snip721Executor = new SNIP721Executor(client, snip721ContractAddress)
  const orm = new OrmWrapper()
  const service = new Service(jankenExecutor, snip721Executor, orm)
  const resolver = new Resolver(service).init()

  // Create an express server and a GraphQL endpoint
  const app = express()
  const corsOpts = {
    origin: '*'
  }

  app.use(cors(corsOpts))
  app.use('/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP({
      schema: schema,
      rootValue: resolver,
      graphiql: true
    })
  )

  app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'))
}

main()
