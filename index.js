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

server.register({
  register: require('good'),
  options: goodOptions
}, err => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      res('hello hapi')
    }
  })

  server.route({
    method: 'GET',
    path: '/{name}',
    handler: (req, res) => {
      res(`hello ${req.params.name}`)
    }
  })
  server.start(() => console.log(`started at ${server.info.uri}`))
})


