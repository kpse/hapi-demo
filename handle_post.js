const Hapi = require('hapi');
const Boom = require('boom');
const Path = require('path');

const server = new Hapi.Server();

server.connection({
  port: '8000'
})


server.route({
  method: ['PUT', 'POST'],
  path: '/user',
  config: {
    payload: {
      output: 'data',
      parse: true,
      allow: 'application/json'
    }
  },
  handler: (req, reply) => {
    reply(req.payload)
  }
})
server.start(() => console.log(`started at ${server.info.uri}`))



