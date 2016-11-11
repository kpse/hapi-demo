const Hapi = require('hapi');
const Boom = require('boom');
const Path = require('path');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: '8000'
})

server.register(require('vision'), err => {
  server.views({
    engines : {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  })

  server.route({
    method: 'GET',
    path: '/{name?}',
    handler: (req, reply) => {
      reply.view('home', {name: req.params.name || 'world'})
    }
  })
  server.start(() => console.log(`started at ${server.info.uri}`))
});


