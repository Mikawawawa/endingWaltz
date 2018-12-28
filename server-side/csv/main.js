const parse = require("csv-parse");
const dataAPI = require("./data/connect");
const answer = require("./config.json").answer;
const md5 = require("js-md5");
const fs = require("fs");
const marked= require("marked")

function initLucky() {
  const input = fs.readFileSync("./lucky.csv");
  parse(
    input,
    {
      comment: "#"
    },
    function(err, output) {
      let index = 1;
      output.forEach(element => {
        if (element[0].length === 5) {
          element[0] = element[0].substr(1, 4);
        }else if(element[0].length===3){
          element[0]='0'+element[0]
        }
        dataAPI.execute(
          "insert into `lucky` (`md5`,`lucky`,`origin`) values (?,?,?)",
          [element[2], element[0], element[1]]
        );
        console.log(element[0] + answer);
        console.log(md5(element[0] + answer));
      });
    }
  );
}

function initQuez() {
  const input = fs.readFileSync("./quez.csv");
  parse(
    input,
    {
      comment: "#"
    },
    function(err, output) {
      let index = 1;
      output.forEach(element => {
        dataAPI.execute("insert into `quez` (`index`,`quez`)values(?,?)", [
          index,
          // marked(fs.readFileSync(`./${element[0].toString()}`).toString())
          marked(fs.readFileSync("./quez/"+(index++)+".md").toString())
        ]);
      });
    }
  );
}

// initLucky();
initQuez();
// console.log(fs.readFileSync("./quez1.md").toString())
