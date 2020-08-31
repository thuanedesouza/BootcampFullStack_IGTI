import express from "express";
import winston from "winston";

const app = express();
app.use(express.json());
// para evitar a fadiga de ficar falando winston.format.combine ou winston.format.printf
const { combine, printf, label, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;//definindo como vai ser impresso
});

const logger = winston.createLogger({
  level: "warn",
  //configurar onde o log vai
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-log.log" })
  ],
  format: combine(
    label({ label: "my-app" }),
    timestamp(),
    myFormat
  )
})

// podemos usar esses comandos dentro das requisições quando quiser guardar o log
logger.error("Error log");
logger.warn("Warn log");
logger.info("Info log");
logger.http("HTTP log");
logger.verbose("Verbose log");
logger.debug("Debug log");
logger.silly("Silly log");

logger.log("Info", "Hello with parameter")