// e usar o mesmo objeto em varios arquivos pode ser uma ferramente útil
import events from "./events.js"
// o on precisa vir antes, 
events.on("testEvent", () => {
  console.log("ouviu tambem");
});
events.emit("testEvent", "bla bla bla")