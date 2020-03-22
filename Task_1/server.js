let http = require("http");

let server = http.createServer();

let http_handler = (req, res) => {

  res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});

  if (req.method === "GET" || req.method === "POST") {
    res.write(`${req.method}:${req.url}`);
  } else {
    res.write(`You made a ${req.method} request! But you should to do GET or POST request`);
  }
  res.end();
};

server.on("request", http_handler);
server.listen(40001);