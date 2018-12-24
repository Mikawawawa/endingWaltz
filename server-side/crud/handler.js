const JSEncrypt = require("node-jsencrypt");
const Mrouter = require("./mqtt/router");
const Poster = require("./mqtt/poster");
const dataAPI = require("./data/connect");
const md5 = require("js-md5");
const router = new Mrouter();

let decrypt = new JSEncrypt(); // 新建JSEncrypt对象
decrypt.setPrivateKey(require("./config").private);

for (let i = 1; i <= 25; i++) {
  console.log(i.toString(), md5(i.toString()));
  router.request(`lucky_check${md5(i.toString())}`, async message => {
    console.log("lucky");
    message = decrypt.decrypt(message);
    message = JSON.parse(message);
    let md5_result = md5(i.toString());
    let payload;
    let md5_find=await md5_lucky_find(md5_result, message.lucky)
    let multi_find=await md5_choice_match(message.choice)
    
    let result = await dataAPI.execute(
      "select * from `quez` where `index` in (select origin from `lucky` where lucky=?)",
      [message.lucky]
    );
    console.log(result.info.quez)

    console.log(md5_find,multi_find)
    payload = {
      status: md5_find&&multi_find,
      info: md5_find&&multi_find?result.info.quez:"ERR"
    };
    console.log(message)
    Poster.client.publish(`push/luckycheck${message.id}`, JSON.stringify(payload));
  });
}

router.request("ordinary_check", async message => {
  console.log("ordinary");
  message = decrypt.decrypt(message);
  message = JSON.parse(message);
  let payload;
  let result=await ordinary_choice_match(message.answer)
  payload = {
    status: result,
    info: result?"正确":"回答不正确"
  };
  Poster.client.publish(`push/ordinarycheck${message.id}`, JSON.stringify(payload));
});

router.request("total",async message=>{
  let result=await dataAPI.execute("select count(*) as length from `suclist`")
  console.log(result.info.length)
  Poster.client.publish("push/total",JSON.stringify({
    process:result.info.length
  }))
})

router.request("submit",async message=>{
  message = decrypt.decrypt(message);
  message = JSON.parse(message);
  if((await dataAPI.execute('select count(*) as length from `suclist`')).info.length<=3){
    let result=await dataAPI.execute('insert into `suclist` (`lucky`,`name`,`tele`)values(?,?,?)',[message.lucky,message.name,message.tele])
    console.log(result)
  }
})

async function md5_lucky_find(md5, lucky) {
  let result = await dataAPI.execute(
    "select count(*) as length from `lucky` where md5=? and lucky = ?",
    [md5, lucky]
  );
  if (result.status !== 0 && result.info.length === 1) return true;
  else return false;
}

async function md5_choice_match(choice) {
  console.log(choice)
  if (choice == require("./config.json").choice) {
    return true;
  } else {
    return false;
  }
}

async function ordinary_choice_match(inChoice) {

  if (inChoice == require("./config.json").ordinary) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
