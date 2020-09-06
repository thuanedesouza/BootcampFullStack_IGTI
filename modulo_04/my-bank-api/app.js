import express from 'express';
import mongoose from 'mongoose';
import { accountRouter } from './routers/accountRouter.js'
const connection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.user.env.USERDB}:${process.user.env.PWDDB}@cluster0.revsp.mongodb.net/contas?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('Application connected to mongoDB');
    });
  }
  catch (err) {
    console.log('Unable to connect ' + (err));
  }
}
connection();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(process.env.PORT, () => {
  console.log('API is connected');
})
