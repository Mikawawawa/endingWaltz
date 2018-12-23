var mqtt = require("mqtt");
const md5 = require("js-md5");
// const JSEncrypt = require("jsencrypt/bin/jsencrypt");
const JSEncrypt = require("node-jsencrypt");
var client = mqtt.connect("ws://localhost:1884");

client.on("connect", function() {
  console.log("Ok");
  // let encryptor = new JSEncrypt();
  // encryptor.setPublicKey(require("./config").public);
  // let rsaPassWord = encryptor.encrypt("EndingWaltz");
  // console.log(rsaPassWord);

  client.subscribe(`test`);
  client.publish(`test`, "okk");
});

client.on("message", function(topic, payload, packet) {
  console.log(payload.toString())
});
