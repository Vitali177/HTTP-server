let http = require("http");
let url = require("url");

let server = http.createServer();

let http_handler = (req, res) => {

  res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});

  if (req.method === "GET") {
    let p = url.parse(req.url, true);
    let queries = p.query;    

    switch(p.pathname) {
      case "/SUM": {
        res.write(`x + y = ${+(queries["x"]) + +(queries["y"])}`);
        break;
      }
      case "/SUB": {
        res.write(`x - y = ${queries["x"] - queries["y"]}`);
        break;
      }
      case "/CONC": {
        res.write(`x + y = ${queries["x"]}${queries["y"]}`);
        break;
      }
      default: {
        res.write("Invalid URL");
        break;
      }
    } 
  } 
  else {
    res.write(`You made a ${req.method} request! But you should to do GET request`);
  }
  res.end();
};

server.on("request", http_handler);
server.listen(40001);