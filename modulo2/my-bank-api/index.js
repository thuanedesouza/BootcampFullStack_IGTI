import express from "express";
import { promises as fs } from "fs";
import accountsRouter from "./routes/accounts.js"

const { readFile, writeFile } = fs;

const app = express();

app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
  const initialJSON = {//objeto JS
    nextId: 1,
    accounts: []
  }

  try {
    await readFile("accounts.json");
  } catch{
    //string JSON
    writeFile("accounts.json", JSON.stringify(initialJSON)).then(() => {
      console.log("API started a file created!");
    }).catch(err => {
      console.log(err);
    });
  }

})