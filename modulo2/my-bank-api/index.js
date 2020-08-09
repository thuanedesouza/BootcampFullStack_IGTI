import express from "express";
import winston from "winston";
import { promises as fs } from "fs";
import accountsRouter from "./routes/accounts.js"

const { readFile, writeFile } = fs;
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}[${label} ${level}: ${message}]`;
})

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-bank-api.log" })
  ],
  format: combine(
    label({ label: "my-banl-api " }),
    timestamp(),
    myFormat
  )
})

const app = express();

app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {

  try {
    await readFile("accounts.json");
    logger.info("API started");
  } catch{
    const initialJSON = {//objeto JS
      nextId: 1,
      accounts: []
    }
    //string JSON
    writeFile("accounts.json", JSON.stringify(initialJSON)).then(() => {
      logger.info("API started a file created!");
    }).catch(err => {
      logger.error(err);
    });
  }

})