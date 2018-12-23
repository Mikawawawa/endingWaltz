const mqtt = require('mqtt')
const client = mqtt.connect('tcp://101.132.116.211:1883')

client.on('connect', function () {
  console.log('MQTT', 'LINK', new Date().toLocaleString())
  client.subscribe('push/#')
  client.subscribe('test')
})

function luckyRequest (index, lucky, choice) {
  client.publish(`request/lucky_check/${index}`, JSON.stringify({
    lucky,
    choice
  }))
}

function ordinaryRequest (answer) {
  client.publish('request/ordinary_check', JSON.stringify({
    answer
  }))
}

function test () {
  client.publish('test', JSON.stringify({
    message: 'ok'
  }))
}

module.exports = {
  client,
  api: {
    luckyRequest,
    ordinaryRequest,
    test
  }
}
