let http = require("http");
let fs = require("fs");

let server = http.createServer();

let http_handler = (req, res) => {
  if (req.method === "GET") {
    fs.readFile(`.${req.url}`, (err, content) => {
      if (err) {
        res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
        res.end("File was not found!");
      }
      else {
        res.setHeader("Content-disposition", "attachment; filename=file.txt");
        res.end(content);
      }      
    });    
  }
  else {
    res.end(`You made a ${req.method} request! But you should to do GET request`);
  }
};

server.on("request", http_handler);
server.listen(40001);