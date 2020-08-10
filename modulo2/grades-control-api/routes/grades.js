import express from "express";
import { promises as fs } from "fs";
import { send } from "process";


const { readFile, writeFile } = fs;
//variavel global no node

global.fileName = "grades.json";
const router = express.Router();

//Crie um endpoint para criar uma grade.
router.post('/', async (req, res, next) => {
  try {
    //pegar info
    let grade = req.body;

    //ler o arquivo e salvar em memoria
    const data = JSON.parse(await readFile(global.fileName));//usar global deixa mais declarativo
    //new grade
    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };
    data.grades.push(grade);
    //sobrescrever arquivo
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);
    res.end();
  } catch (err) {
    next(err);
  }
});

/*Crie um endpoint para atualizar uma grade. 
Este endpoint deverá receber como parâmetros o id da grade a ser alterada e os campos student,
subject, type e value. O endpoint deverá validar se a grade informada existe, 
caso não exista deverá retornar um erro.
*/

router.put('/', async (req, res, next) => {
  try {
    let grade = req.body;
    //validação
    if (!grade.student || grade.value == null) {
      throw new Error(" Name and grade value needed.");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex(grd => grd.id === parseInt(grade.id));

    //validação
    if (index === -1) {
      throw new Error("Grade not found");
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    data.grades[index].timestamp = new Date();
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(grade);
  } catch (err) {
    next(err);
  }
});

//Crie um endpoint para excluir uma grade
router.delete('/:id', async (req, res, next) => {
  try {

    const data = JSON.parse(await readFile(global.fileName));

    //validação
    const index = data.grades.findIndex(grd => grd.id === parseInt(req.params.id));
    if (index === -1) {
      throw new Error("Grade not found");
    }
    //pegar todos que não tem esse id 
    data.grades = data.grades.filter(grade => grade.id !== parseInt(req.params.id));
    //devolver array filtrado como string json
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();

  } catch (err) {
    next(err);
  }
})

//Crie um endpoint para consultar uma grade em específico.
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(grade =>
      grade.id === parseInt(req.params.id))
    res.send(grade);
  } catch (err) {
    next(err);
  }
});

//Crie um endpoint para consultar a nota total de um aluno em uma disciplina.
router.get('/total/:student/:subject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const student = req.params.student;
    const subject = req.params.subject;
    const filter = await data.grades.filter(
      (grades) => grades.student === student && grades.subject === subject);
    const values = filter.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);
    res.send('a soma das notas é igual a ' + values);
  } catch (err) {
    next(err);
  }

});

//Crie um endpoint para consultar a média das grades de determinado subject e type
router.get('/avg/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const subject = req.params.subject;
    const type = req.params.type;
    const filter = await data.grades.filter(grade => grade.subject === subject && grade.type === type);

    const value = filter.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0)
    console.log(value);
    console.log(filter.length);
    const media = value / filter.length;
    res.send(`A média das notas das avaliações ${type} do curso ${subject} é ${media}`);
  } catch (err) {
    next(err);
  }
});


//Crie um endpoint para retornar as três melhores grades de acordo com determinado subject e type
router.get('/top/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const subject = req.params.subject;
    const type = req.params.type;
    const filter = await data.grades.filter(grade => grade.subject === subject && grade.type === type);
    filter.sort((a, b) => {
      return b.value - a.value;
    })

    const array = [];
    for (let i = 0; i < 3; i++) {
      array[i] = filter[i];
    }
    res.send(array);

  } catch (err) {
    next(err);
  }


});

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
})

export default router;


