const md5=require("js-md5")

for(let i=1;i<=25;i++){
    console.log(i,md5(i.toString()))
}