import express from "express";
const app = express();

app.get("/", (req, res) => {
  //padrão express
  throw new Error("Error message test");
});

//ao tratar uma função asyncrona precisamos passar o erro para frente com o next usando try catch
app.post("/", async (req, res, next) => {
  try {
    throw new Error("Error Message Async");
  } catch (err) {
    next(err);
  }
});

// tratamento customizado
app.use((err, req, res, next) => {
  console.log("Erro 1");
  next(err);
})

app.use((err, req, res, next) => {
  console.log("Erro 2");
  res.status(500).send("Ocorreu um erro, tente novamente");// o numero que fizer sentido

})


app.listen(3000, () => {
  console.log("API started");
});