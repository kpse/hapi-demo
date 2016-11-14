const Hapi = require('hapi');
const Joi = require('joi');
const Path = require('path');

const server = new Hapi.Server();

server.connection({
  port: '8000'
})


server.route({
  method: ['PUT', 'POST'],
  path: '/user/{id?}',
  config: {
    validate: {
      params: Joi.object({
        id: Joi.number()
      }),
      payload: Joi.object({
        id: Joi.number(),
        email: Joi.string()
      }).unknown(),
      query: Joi.object({
        id: Joi.number()
      })
    },
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



