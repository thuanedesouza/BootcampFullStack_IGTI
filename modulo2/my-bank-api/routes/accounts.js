import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
//variavel global no node

global.fileName = "accounts.json";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    //pegar info
    let account = req.body;
    //ler o arquivo e salvar em memoria
    const data = JSON.parse(await readFile(global.fileName));//usar global deixa mais declarativo
    //nova conta

    account = { id: data.nextId++, ...account };
    // com id: data.nextId++ ele vai atribuir e depois incrementar a variavel de data
    //data.nextId++;
    account.id = data.nextId;

    data.accounts.push(account);
    //sobrescrever arquivo
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }

});

router.get("/", async (req, res) => {//todas as contas
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
})

router.get("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(account =>
      account.id === parseInt(req.params.id))
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});


export default router;