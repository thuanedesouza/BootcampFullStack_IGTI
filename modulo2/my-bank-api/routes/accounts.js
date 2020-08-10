import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
//variavel global no node

global.fileName = "accounts.json";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    //pegar info
    let account = req.body;
    //validação
    if (!account.name || account.balance == null) {
      throw new Error(" Name and balance needed.");
    }
    //ler o arquivo e salvar em memoria
    const data = JSON.parse(await readFile(global.fileName));//usar global deixa mais declarativo
    //nova conta

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance
    };
    // com id: data.nextId++ ele vai atribuir e depois incrementar a variavel de data
    //data.nextId++;
    data.accounts.push(account);
    //sobrescrever arquivo
    await writeFile(global.fileName, JSON.stringify(data, null, 2));


    res.send(account);
    res.end();
    logger.info(`POST/ account - ${JSON.stringify(account)}`)
  } catch (err) {
    next(err);
  }

});

router.get("/", async (req, res, next) => {//todas as contas
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
    logger.info("GET/account");
  } catch (err) {
    next(err);
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(account =>
      account.id === parseInt(req.params.id))
    res.send(account);
    logger.info("GET/account/:id");
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id));
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
    logger.info(`DELETE /account/:id, ${req.params.id}`)
  } catch (err) {
    next(err);
  }
})


// put altera o body da requisição completamente
//alterar pelo id

router.put("/", async (req, res, next) => {
  try {
    let account = req.body;
    //validação
    if (!account.name || account.balance == null) {
      throw new Error(" Name and balance needed.");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(acc => acc.id === parseInt(account.id));

    //validação
    if (index === -1) {
      throw new Error("Registro não encontrado");
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data));
    res.send(account);
    logger.info(`PUT/ account - ${JSON.stringify(account, null, 2)}`)
  } catch (err) {
    next(err);
  }
});
router.patch("/updateBalance", async (req, res, next) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(acc => acc.id === parseInt(account.id));
    //validacao
    //validação
    if (!account.id || account.balance == null) {
      throw new Error(" ID and balance needed.");
    }

    if (index === -1) {
      throw new Error("Registro não encontrado");
    }

    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data));
    res.send(data.accounts[index]);
    logger.info(`PATCH/account/updateBalance - ${JSON.stringify(account)}`)
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => {
  logger.error(`${err.message}`);

  res.status(400).send({ error: err.message });
})
//patch fazr alterações parciais
export default router;