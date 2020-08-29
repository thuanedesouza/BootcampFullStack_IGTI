import express from 'express';
import mongoose from 'mongoose';
import { studentRouter } from './routes/studentRouter.js';

//conectar mongoDB pelo mongoose
const connection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://thuane:igti@cluster0.revsp.mongodb.net/grades?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(
        console.log("conectado ao Mongo DB Atlas")
      )
  }
  catch (err) {
    console.log("Erro ao conectar ao Mongo DB Atlas " + (err));
  }
}

connection();
const app = express();

app.use(express.json());
app.use(studentRouter);

app.listen(3000, () => {
  console.log('API iniciada')
})