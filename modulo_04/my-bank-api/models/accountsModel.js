import mongoose from 'mongoose';

const accountsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  agencia: {
    type: Number,
    require: true
  },
  conta: {
    type: Number,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    validation(balance) {
      if (balance < 0) {
        throw new Error('Valor negativo!')
      }
    },
    min: 0
  }

});
const accountModel = mongoose.model('account', accountsSchema, 'account')
export { accountModel }

