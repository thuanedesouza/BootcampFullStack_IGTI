

// formato promises
import { promises as fs } from "fs";
// fs.writeFile("test0.txt", "bla bla bla").then(() => {
//   fs.appendFile("test0.txt", "\nTeste append file").then(() => {
//     fs.readFile("test0.txt", "utf-8").then((resp) => {
//       console.log(resp);
//     }).catch((err) => {
//       console.log(err);
//     });
//   }).catch((err) => {
//     console.log(err);
//   })
// }).catch((err) => {
//   console.log(err);
// })

//promises com async <3 <3 <3
init();
async function init() {
  try {
    await fs.writeFile("test0.txt", "bla bla bla");
    await fs.appendFile("test0.txt", "\nTeste append file");
    const data = await fs.readFile("test0.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}




// // import fs from "fs";// modulo nativo do js

// // formato assincrono <3
// console.log('Observe a fila do event loop 1')
// fs.writeFile("teste.txt", " bla bla bla", (err) => {// sempre sobrescreve se nao usar fd.appendFile
//   //fs.appendFile("teste.txt", " bla bla bla", (err) => {// sempre concatena
//   console.log('Observe a fila do event loop 2')
//   if (err) {
//     console.log(err);
//   } else {
//     fs.appendFile("teste.txt", "\nteste append file ", (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         fs.readFile("teste.txt", "utf-8", (err, data) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         })
//       }
//     });
//   }
// })
// console.log('Observe a fila do event loop 3')

// // formato sincrono, a thread fica parada esperando cada passo, evitar pq inpacta o rendimento do sistema

// try {
//   console.log("Forma sincrona\n1");
//   fs.writeFileSync("test.txt", "bla bla bla");
//   console.log("2");
//   const data = fs.readFileSync("test.txt", "utf-8");
//   console.log(data);
//   console.log("3");
// } catch (err) {
//   console.log(err);
// }
