//desafio2

/*O desafio final consiste em desenvolver uma API chamada “grades-control-api” 
para controlar notas de alunos em matérias de um curso. Você deverá desenvolver endpoints para criação, 
atualização, exclusão e consulta de notas, aqui chamadas de grades. As grades deverão ser salvas em um arquivo json, 
chamado “grades.json”. 
Este arquivo será previamente fornecido e seus endpoints devem atuar considerando os registros já existentes.
*/

import express from "express";
import { promises as fs } from "fs";
import gradesRouter from "./routes/grades.js";

const app = express();
app.use(express.json());

app.use("/grade", gradesRouter);

const { readFile, writeFile } = fs;


app.listen(3000, async () => {
  try {
    await readFile("grades.json");
    console.log("API started");
  } catch{
    const initialJSON = {//objeto JS
      nextId: 1,
      grades: []
    }
    //string JSON
    writeFile("grades.json", JSON.stringify(initialJSON)).then(() => {
      console.log("API started a file created!");
    }).catch(err => {
      console.log(err);
    });
  }
})