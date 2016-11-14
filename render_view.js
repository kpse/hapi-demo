const Hapi = require('hapi');
const Boom = require('boom');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: '8000'
});

server.register(require('vision'), err => {
  server.views({
    engines : {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  });

  server.ext('onPreResponse', (req, reply) => {
    const resp = req.response;

    console.log('resp', resp);

    if (!resp.isBoom) {
      return reply.continue();
    }
    console.log('resp2', resp);
    reply.view('error', resp.output.payload)
      .code(resp.output.statusCode)

  });


  server.route({
    method: 'GET',
    path: '/{name?}',
    handler: (req, reply) => {
      reply.view('home', {name: req.params.name || 'world'})
    }
  });

  server.route({
    method: 'GET',
    path: '/error404',
    handler: (req, reply) => {
      reply(Boom.notFound())
    }
  });

  server.route({
    method: 'GET',
    path: '/error400',
    handler: (req, reply) => {
      reply(Boom.badRequest())
    }
  });

  server.start(() => console.log(`started at ${server.info.uri}`))
});


