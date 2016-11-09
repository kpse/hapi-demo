const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: '8000'
})

server.route({
  method: 'GET',
  path: '/',
  handler: (req, res) => {
    res('hello hapi')
  }
})

server.start(() => console.log(`started at ${server.info.uri}`))