import mongoose from 'mongoose';
//conectando ao mongoose
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
//criação do modelo
const studentsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true
  },
  value: {
    type: Number,
    require: true,
  },
  lastModified: {
    type: Date,
    default: Date.now
  },

})
//definindo o modelo da coleção, mongoDB coloca no plural, a versão do nosso modelo. 
//com o parâmetro 3 definimos que nosso modelo é student mesmo, e ele nao cria uma nova collection students
mongoose.model('student', studentsSchema, 'student');

const student = mongoose.model('student');

//criando novo documento
new student({
  name: "Paulo Assis 2 ",
  subject: "Matemática",
  type: "Trabalho Prático",
  value: 22
}).save().then(() => {
  console.log("Documento Inserido");
}).catch(err => console.log("Falha ao inserir o documento"));

