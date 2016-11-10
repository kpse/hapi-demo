const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: '8000'
})

const goodOptions = {
  reporters: {
    firstReporter: [{
      module: 'good-console',
    }, 'stdout']
  }
}

function handler(req, res) {
  res(req.params)
}

server.register({
  register: require('good'),
  options: goodOptions
}, err => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      server.log('error', 'oh, no')
      server.log('info', 'replying')
      res('hello hapi')
    }
  })

  server.route({
    method: 'GET',
    path: '/{name*}',
    handler: handler
  })

  server.route({
    method: 'GET',
    path: '/files/{name*}',
    handler: handler
  })

  server.route({
    method: 'GET',
    path: '/jpg/{name}.jpg',
    handler: handler
  })


  server.start(() => console.log(`started at ${server.info.uri}`))
})


