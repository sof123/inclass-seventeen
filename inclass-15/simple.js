const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     var payload = { 'hello': 'world' }
  var user = "";
  if (req.method == 'GET' && req.url == '/')
  {
   payload =  { 'hello': 'world' }

  }
  else if (req.method == 'GET' && req.url == '/articles')
  {
   payload = { 'articles' : [ { id: 1, author: 'Scott', body:'A post' }, { id: 2, author: 'Scotty', body:'A posty' },
                 { id: 3, author: 'Scottie', body:'A postie' }]}
  }
  else if (req.method == 'POST' && req.url == '/login')
  {
    var body = JSON.parse(req.body)

    console.log("Body is " + req.body)
    payload = { username : body.username, result: 'success' }
  }
  else if (req.method == 'PUT' && req.url == '/logout')
  {
    payload = 'OK'
  }
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}
