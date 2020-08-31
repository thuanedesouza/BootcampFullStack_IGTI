// rota no nível do servidor para organização de requisições

import express from "express";
import carrosRouter from "./carrosRouter.js";

const app = express();
app.use(express.json());

//todos os métodos https que chegarem com /carros vai ser tratado aqui
app.use("/carros", carrosRouter);

app.use((_req, _res, next) => {
  console.log(new Date);
  next();
})

app.get("/test", (_req, res) => {
  res.end();
});

app.listen(3000, () => {
  console.log("API Started");
});