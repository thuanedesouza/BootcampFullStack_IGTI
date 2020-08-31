import express from "express";
const router = express.Router();
// quando mandar /carros já vai cair aqui nessa /
router.get("/", (_req, res) => {
  console.log("GET/carros");
  res.send("GET/carros");
})

router.get("/precos", (_req, res) => {
  console.log("GET/carros/preços");
  res.send("GET/carros/preços");
})
export default router;
