import http from "http";
http.createServer((req, res) => {
  if ((req.method === "GET") && (req.url === "/teste")) {
    res.write(" GET/ teste executado com suecesso")
  } else {
    res.write("Hello World");
  }
  res.statusCode = 200; // 200 indica que foi com sucesso
  res.end();
}).listen(8080);

// sempre que alterar reiniciar o arquivo no terminal!