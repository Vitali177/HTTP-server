let http = require("http");
let qs = require("querystring");

let server = http.createServer();

let http_handler = (req, res) => {
  if (req.method === "POST") {
    res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
    let result = "SERVER:";

    req.on("data", data => {result += data});
    req.on("end", () => {
      let o = qs.parse(result);

      for (let key in o) {
        res.write(`${key}${o[key]}`);
      }
      res.end();
    });
  }
  else {
    res.end(`You made a ${req.method} request! But you should to do POST request`);
  }
};

server.on("request", http_handler);
server.listen(40001);