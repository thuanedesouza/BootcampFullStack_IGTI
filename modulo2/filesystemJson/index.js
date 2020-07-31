import { promises as fs } from "fs";
writeReadJson();
async function writeReadJson() {
  try {
    const arrayCarros = ["Gol", "Palio", "Ferrari"];
    const obj = {
      carros: arrayCarros
    };
    //Escrever em arquivo JSON
    await fs.writeFile("teste.json", JSON.stringify(obj));
    //mudar conteúdo
    const data = JSON.parse(await fs.readFile("teste.json"));// nao precisa de utf-8 pq o JSON.parse já resolve
    data.carros.push('Sandero');
    console.log(data);
    // pegar os dados e sobrescrever JSON
    await fs.writeFile("teste.json", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}
