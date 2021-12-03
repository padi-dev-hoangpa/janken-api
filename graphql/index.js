const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

// database
const schema = require('./schema')
const Resolver = require('./Resolver')
const Service = require('../service/ApiService.js')
const initClient = require('../client/client')
const contractAddress = process.env.SECRET_NFT_CONTRACT

const { graphqlUploadExpress } = require('graphql-upload')

const main = async () => {
  const client = await initClient()
  const service = new Service(client, contractAddress)
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
