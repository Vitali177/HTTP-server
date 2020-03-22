let http = require("http");

let server = http.createServer();

let http_handler = (req, res) => {
  if (req.method === "POST") {
    res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
    let result = "";

    req.on("data", data => {result += data});
    req.on("end", () => {
      let obj = JSON.parse(result);
      res.end(`{"SERVER":${JSON.stringify(obj)}}`);
    });
  }
  else {
    res.end(`You made a ${req.method} request! But you should to do POST request`);
  }
};

server.on("request", http_handler);
server.listen(40001);