let http = require("http");

let server = http.createServer();

let http_handler = (req, res) => {
  if (req.method === "GET") {
    switch(req.url) {
      case "/": 
        const markup = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="./main.css">
            <title>Node.js</title>
          </head>
          <body>
            <form action="#">
              <input type ="text" class="x" name="x" placeholder="x">
              <input type ="text" class="y" name="y" placeholder="y">
              <input type ="text" class="result" name="result" placeholder="Result">
          
              <input type="submit" class="sum" value="SUM">
              <input type="submit" class="sub" value="SUB">
              <input type="submit" class="conc" value="CONC">
              <input type="submit" class="cancel" value="CANCEL">
            </form>
            <script src="./script.js"></script>
          </body>
          </html>`;
        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
        res.end(markup);
        break;

      case "/main.css": 
        const css = `
          input[type="submit"] {
            border: 0;
            height: 20px;
            background: #397cb3;
            color: #FFFFFF;
            cursor: pointer;
          }`;
        res.writeHead(200, {"Content-type": "text/css; charset=utf-8"});
        res.end(css);
        break;

      case "/script.js":
        const script = `
          const result = document.querySelector("input.result");
          const x = document.querySelector("input.x");
          const y = document.querySelector("input.y");
          
          document.querySelector("input.sum").addEventListener("click", () => {
            result.value = (+x.value) + (+y.value);
          });
          
          document.querySelector("input.sub").addEventListener("click", () => {
            result.value = x.value - y.value;
          });
          
          document.querySelector("input.conc").addEventListener("click", () => {
            result.value = x.value + y.value;
          });
          
          document.querySelector("input.cancel").addEventListener("click", () => {
            result.value = "CANCEL";
          });

          document.querySelector("form").addEventListener("click", (e) => {
            e.preventDefault();
          });
        `;
        res.writeHead(200, {"Content-type": "text/javascript; charset=utf-8"});
        res.end(script);
        break;

      default:
        res.writeHead(404, {"Content-type": "text/html; charset=utf-8"});
        res.end("404 Not found");
        break;
    }    
  } 
};

server.on("connection", (socket) => {
  console.log("Get Socket");
});

server.on("request", http_handler);
server.listen(40001);