class Router {
  constructor () {
    this.requestPath = {
      '*': function (message) {
        console.log(message)
      }
    }
    this.updatePath = {
      '*': function (message) {
        console.log(message)
      }
    }
    this.fetchPath = {
      '*': function (message) {
        console.log(message)
      }
    }
    this.linkPath = {
      '*': function (message) {
        console.log(message)
      }
    }
    // eslint-disable-next-line no-unused-expressions
    this.willPath = {
      '*': function (message) {
        console.log(message)
      }
    },
    this.pushPath = {
      '*': function (message) {
        console.log(message)
      }
    }
  }
  remove (methods, route) {
    switch (methods) {
      case 'request': {
        this.requestPath[route] = () => {}
        break
      }
      case 'fetch': {
        this.fetchPath[route] = () => {}
        break
      }
      case 'update': {
        this.updatePath[route] = () => {}
        break
      }
      case 'link': {
        this.linkPath[route] = () => {}
        break
      }
      case 'will': {
        this.willPath[route] = () => {}
        break
      }
      case 'push': {
        this.pushPath[route] = () => {}
        break
      }
      default:
        break
    }
  }
  push (path, callback) {
    console.log(path, callback)
    this.pushPath[path] = callback
  }
  request (path, callback) {
    this.requestPath[path] = callback
  }
  update (path, callback) {
    this.updatePath[path] = callback
  }
  fetch (path, callback) {
    this.fetchPath[path] = callback
  }
  link (path, callback) {
    this.linkPath[path] = callback
  }
  will (path, callback) {
    this.willPath[path] = callback
  }
  handler (topic, message) {
    message = message.toString()
    if (topic === 'test') {
      // console.log(message)
      return
    }
    let methods = topic.split('/')[0]
    let path = topic.split('/')
    path.shift()
    path = path.join('/')
    switch (methods) {
      case 'request': {
        if (path in this.requestPath) {
          this.requestPath[path](message)
        } else {
          console.log('ERR', 'Unknown request path', path)
        }
        break
      }
      case 'fetch': {
        if (path in this.fetchPath) {
          this.fetchPath[path](message)
        } else {
          console.log('ERR', 'Unknown fetch path', path)
        }
        break
      }

      case 'update': {
        if (path in this.updatePath) {
          this.updatePath[path](message)
        } else {
          console.log('ERR', 'Unknown update path', path)
        }
        break
      }

      case 'link': {
        if (path in this.linkPath) {
          this.putPath[path](message)
        } else {
          console.log('ERR', 'Unknown link path', path)
        }
        break
      }
      case 'will': {
        if (path in this.willPath) {
          this.willPath[path](message)
        } else {
          console.log('ERR', 'Unknown will path', path)
        }
        break
      }
      case 'push': {
        if (path in this.pushPath) {
          this.pushPath[path](message)
        } else {
          console.log('ERR', 'Unknown push path', path)
        }
        break
      }
      default:
        console.log('ERR', 'Unknow Method', methods)
    }
  }
}

module.exports = Router
