module.exports = {
  apps: [
    {
      name: 'Janken API',
      script: './graphql/index.js',
      env: {
        PORT: 4000,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 4001,
        NODE_ENV: 'production'
      }
    }
  ]
}
