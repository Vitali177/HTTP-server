let http = require("http");
let parseString = require("xml2js").parseString;

let server = http.createServer();

let http_handler = (req, res) => {
  if (req.method === "POST") {
    let xmlText = "";

    req.on("data", data => {xmlText += data});
    req.on("end", () => {
      parseString(xmlText, (err, result) => {
        if (err) {
          res.writeHead(400, {});
        } else {
          res.writeHead(200, {"Content-type": "application/xml; charset=utf-8"});
          res.end(`<SERVER>${xmlText}</SERVER>`);
        }
      });
    });
  }
  else {
    res.end(`You made a ${req.method} request! But you should to do POST request`);
  }
};

server.on("request", http_handler);
server.listen(40001);