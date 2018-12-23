const mqtt = require("mqtt");
const client = mqtt.connect("tcp://101.132.116.211:1883");

client.on("connect", function() {
  console.log("MQTT", "LINK", new Date().toLocaleString());
  client.subscribe("request/#");
  client.subscribe("update/#");
  client.subscribe("fetch/#");
  client.subscribe("link/#");
  client.subscribe("will/#");
});

module.exports = {
  client,
  api: {}
};
