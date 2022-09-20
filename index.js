const http = require('http')

const requestListener = function (req, res) {
    res.writeHead(200)
    res.end('<h1>Loud greetings to the world!</h1>')
}

const server = http.createServer(requestListener)
server.listen(8080)
