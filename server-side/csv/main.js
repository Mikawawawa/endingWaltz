const parse = require("csv-parse");
const dataAPI = require("./data/connect");
const answer = require("./config.json").answer;
const md5 = require("js-md5");
const fs = require("fs");

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
        }
        dataAPI.execute(
          "insert into `lucky` (`md5`,`lucky`,`origin`) values (?,?,?)",
          [md5(index.toString()), element[0], index++]
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
          index++,
          element
        ]);
      });
    }
  );
}

initLucky();
initQuez();
