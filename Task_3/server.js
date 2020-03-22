let http = require("http");
let url = require("url");
let qs = require("querystring");

let server = http.createServer();

let http_handler = (req, res) => {
  res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});

  if (req.method === "GET") {
    const markup = `
    <form method="post" action="/">
      <input type ="text" name="x" placeholder="x">
      <input type ="text" name="y" placeholder="y">

      <input formaction="/SUM" formmethod="post" type="submit" value="SUM">
      <input formaction="/SUB" formmethod="post" type="submit" value="SUB">
      <input formaction="/CONC" formmethod="post" type="submit" value="CONC">
      <input formaction="/CANCEL" formmethod="post" type="submit" value="CANCEL">
    </form>
    `;
    res.end(markup);
  } 
  else if (req.method === "POST") {
    res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
    let result = "";

    req.on("data", data => {result += data});
    req.on("end", () => {
      let o = qs.parse(result);
      let p = url.parse(req.url, true);

      switch(p.pathname) {
        case "/SUM": {
          res.write(`x + y = ${+(o["x"]) + +(o["y"])}`);
          break;
        }
        case "/SUB": {
          res.write(`x - y = ${+o["x"] - +o["y"]}`);
          break;
        }
        case "/CONC": {
          res.write(`x + y = ${o["x"]}${o["y"]}`);
          break;
        }
        case "/CANCEL": {
          res.write("CANCEL");
          break;
        }
        default: {
          res.write("Invalid Form action");
          break;
        }
      } 
      res.end();
    });
  }
  else {
    res.end(`You made a ${req.method} request! But you should to do GET request`);
  }
};

server.on("request", http_handler);
server.listen(40001);