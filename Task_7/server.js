var http = require('http');
var fs = require('fs');
var url = require("url");
var formidable = require('formidable');

http.createServer((req, res) => {
    if (req.method === "GET") {
        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
        const markup = `
        <form action="/" method="post" enctype="multipart/form-data">
            <input type="file" name="filetoupload">
            <input formaction="/upload" type="submit" value="Upload">
            <input formaction="/CANCEL" formmethod="post" type="submit" value="CANCEL">
        </form>
        `;
        res.end(markup);
    } 
    else if (req.method === "POST") {
        let p = url.parse(req.url, true);

        switch(p.pathname) {
            case "/upload":
                var form = new formidable.IncomingForm();
                form.parse(req, function (err, fields, files) {
                    var oldpath = files.filetoupload.path;
                            
                    var newpath =  `./upload/${files.filetoupload.name}`;
                
                    fs.rename(oldpath, newpath, function (err) {
                        if (err) throw err;
                        res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
                        res.end('Файл получен');
                    });
                });
                break;
            case "CANCEL":
                res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
                res.end('CANCEL');
                break;
            default:
                res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
                res.end("Invalid Form action");
            break;
        }         
    } 
    else {
        res.end(`You made a ${req.method} request! But you should to do GET of POST request`);
    }    
}).listen(40001); 