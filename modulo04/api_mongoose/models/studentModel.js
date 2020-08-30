import mongoose from 'mongoose';
//dentro do esquema podemos criar funções de validação
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
    validade(value) {
      if (value < 0) {
        throw new Error('Valor negativo!')
      }
    }
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
})

// referenciando o modelo à uma coleção
const studentModel = mongoose.model('student', studentsSchema, 'student')
// exportando
export { studentModel }
