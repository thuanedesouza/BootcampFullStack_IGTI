//rotas no nível da aplicação

import express from "express";
//criando uma instancia do express
const app = express();
app.use(express.json());

//configurando servidor
app.listen(3000, (req, res) => {
  console.log("API started");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.send("post");
});

//all
app.all("/testall", (req, res) => {
  res.send(req.method);//.method mostra o metodo http que está sendo usado
});

//caracteres especiais
// interrogação faz com que a ultima letra antes dela seja opcional
app.get("/teste?", (req, res) => {
  res.send("/teste?");
});

// + indica que a letra anterior pode ser repetida varias vezes e vai funcionar igual
app.get("/buzz+", (req, res) => {
  res.send("/buzz...+");
});
// * onde colocado ele deixa trocar por qualquer coisa
app.get("/one*Blue", (req, res) => {
  res.send(req.path);
});

//() a string dentro dele é tratada como um caracter
app.post("/test(ing)+", (req, res) => {
  res.send("/test(ing)?");
});

//expressão regular, vai entrar tudo que vier antes de red
app.get(/.*Red$/, (req, res) => {
  res.send("/.*Red$/");
});

//parametros

app.post("/try(ing)?", (req, res) => {
  console.log(req.body);
  res.send("/try(ing)?");
});

app.get("/testParam/:id/:a?", (req, res) => {
  res.send(req.params.id + ' ' + req.params.a);
});

//parametros via query
app.get("/testQuery", (req, res) => {
  res.send(req.query);
})

//next
app.get("/testMultipleHandlers", (req, res, next) => {
  console.log("callback 1");
  next();
}, (req, res) => {
  console.log("callback 2");
  res.end();
});

//next com array

const callback1 = (req, res, next) => {
  console.log('Callback1');
  next();
}

const callback2 = (req, res, next) => {
  console.log('Callback2');
  next();
}

const callback3 = (req, res) => {
  console.log('Callback3');
  res.end();
}

app.get("/TestMultipleHandlersArray", [callback1, callback2, callback3]);

//route <3
app.route("/testRoute")
  .get((req, res) => {
    res.send("/testRoute GET");
  })
  .post((req, res) => {
    res.send("/testRoute POST");
  })
  .delete((req, res) => {
    res.send("/testRoute DELETE")
  })