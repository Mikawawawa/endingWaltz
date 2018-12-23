const fork = require('child_process')
const port = require('./webpack.config').devServer.port

fork.exec(`start http://localhost:${port}`)
