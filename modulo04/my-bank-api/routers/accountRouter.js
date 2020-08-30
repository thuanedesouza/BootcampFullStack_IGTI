import express from 'express';
import { accountModel } from '../models/accountsModel.js'

const app = express();
//CREATE
app.post('/account', async (req, res) => {
  try {
    const account = new accountModel(req.body);
    await account.save();
    res.send(account);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

//RETRIEVE - consulta
app.get('/account', async (req, res) => {
  try {
    const accounts = await accountModel.find({});
    res.send(accounts);
  }
  catch{
    res.status(500).send(error);
  }
})

//UPDATE 
app.patch('/account/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const account = await accountModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send(account);
  }
  catch (err) {
    res.status(500).send(err);
  }
})

app.delete('/account/:id', async (req, res) => {
  try {
    const account = await accountModel.findByIdAndDelete({ _id: req.params.id })
    if (!account) {
      res.status(404).send('Documento nao encontrado na selecao');
    }
    else {
      res.status(200).send();
    }
  }
  catch (err) {
    res.status(500).send(err);
  }
})

//deposits
app.patch('/accountDeposit/:agencia/:conta/:deposit', async (req, res) => {
  try {
    const filter = {
      $and: [{ conta: req.params.conta },
      { agencia: req.params.agencia }]
    };
    const deposit = req.params.deposit;

    let account = await accountModel.findOneAndUpdate(filter, { $inc: { balance: deposit } }, { new: true });
    if (!account) {
      res.status(404).send('Conta nao encontrada na selecao');
    }
    console.log(account);
    res.status(200).send(account);

  }
  catch (err) {
    res.status(500).send();
  }
});

//saque
app.patch('/accountSaque/:agencia/:conta/:saque', async (req, res) => {
  try {
    const filter = {
      $and: [{ conta: req.params.conta },
      { agencia: req.params.agencia }]
    };
    const saque = req.params.saque;
    console.log(saque)

    let account = await accountModel.findOneAndUpdate(filter, { $inc: { balance: -saque } }, { new: true });

    console.log(account);
    res.status(200).send(account);
    if (!account) {
      res.status(404).send('Conta nao encontrada na selecao');
    }
  }
  catch (err) {
    res.status(500).send();
  }
});

//consultar saldo
app.get('/accountBalance/:agencia/:conta', async (req, res) => {
  try {
    const filter = {
      $and: [{ conta: req.params.conta },
      { agencia: req.params.agencia }]
    };

    let balance = await accountModel.find(filter, { _id: 0, balance: 1 });
    if (balance.length < 1) {
      res.status(404).send('Conta nao encontrada na selecao');
    }
    console.log(balance);

    res.status(200).send(balance);
  }
  catch (err) {
    res.status(500).send();
  }
});

//excluir conta e falar quantas contas naquela agencia restaram no nosso banco de dados
app.delete('/accountDelete/:agencia/:conta', async (req, res) => {
  try {
    const filter = {
      $and: [{ conta: req.params.conta },
      { agencia: req.params.agencia }]
    };
    const agency = req.params.agencia;
    let account = await accountModel.findOneAndDelete(filter);
    console.log('ok');

    if (!account) {
      res.status(404).send('Documento nao encontrado na selecao');
    }
    else {

      const accountsLeft = (await accountModel.countDocuments(
        { agencia: { $eq: agency } }, function (err, count) {
          if (err) {
            res.send(err);
          } else {
            return count;
          }
        }));

      res.status(200).send('Temos ' + accountsLeft + ' contas');

    }

  }
  catch (err) {
    res.status(500).send(err);
  }
})
//transferencia 
app.patch('/accountTransfer/:contaOrigem/:contaDestino/:value', async (req, res) => {
  try {
    const agenciaOrigem = await accountModel.find({ conta: req.params.contaOrigem }, { _id: 0, agencia: 1 })
    const agenciaDestino = await accountModel.find({ conta: req.params.contaDestino }, { _id: 0, agencia: 1 })
    const value = req.params.value;
    //comparando se os objsetos sao iguais
    if (JSON.stringify(agenciaOrigem) == JSON.stringify(agenciaDestino)) {

      const accountOrigem = await accountModel.findOneAndUpdate({ conta: req.params.contaOrigem }, { $inc: { balance: -value } }, { new: true });
      await accountModel.findOneAndUpdate({ conta: req.params.contaDestino }, { $inc: { balance: value } }, { new: true });
      res.send(accountOrigem);
    }
    else {
      const accountOrigem = await accountModel.findOneAndUpdate({ conta: req.params.contaOrigem }, { $inc: { balance: -value - 8 } }, { new: true });
      await accountModel.findOneAndUpdate({ conta: req.params.contaDestino }, { $inc: { balance: value } }, { new: true });
      res.send(accountOrigem);
    }
  }
  catch (err) {
    console.log(err);
  }

})


//media de saldo de clientes de uma agencia
app.get('/account/avg/:agencia', async (req, res) => {
  try {
    const agency = parseInt(req.params.agencia);
    console.log(agency);
    const avgBalance = await accountModel.aggregate([
      { $match: { "agencia": agency } },
      { $group: { _id: null, avgBalance: { $avg: "$balance" } } }
    ])
    console.log(avgBalance)
    res.send(avgBalance);
  }
  catch (err) {
    res.status(400).send(err)
  }
})

// o endpoint retorna uma quantidades clientes ordenados 
// do menor saldo para o maior saldo
app.get('/account/lowerBalance/:listLength', async (req, res) => {

  try {
    const listLength = parseInt(req.params.listLength);

    const lowerBalance = await accountModel.aggregate([
      { $project: { agencia: 1, conta: 1, balance: 1 } },
      { $sort: { "balance": 1 } },
      { $limit: listLength }
    ])
    res.send(lowerBalance);
  }
  catch (err) {
    res.status(400).send(err.message);
  }
})

// o endpoint retorna uma quantidade de clientes ordenados 
// do maior saldo para o menor saldo
app.get('/account/higherBalance/:listLength', async (req, res) => {

  try {
    const listLength = parseInt(req.params.listLength);

    const lowerBalance = await accountModel.aggregate([
      { $project: { agencia: 1, conta: 1, balance: 1 } },
      { $sort: { "balance": -1 } },
      { $limit: listLength }
    ])
    res.send(lowerBalance);
  }
  catch (err) {
    res.status(400).send(err.message);
  }
})

// app.get('/account/privateList/', async (req, res) => {
//   try {
//     const agencies = await accountModel.find().distinct("agencia");
//     const privateList = agencies.forEach(ag => {
//       return (accountModel.aggregate([
//         { $match: { "agencia": ag } },
//         { $project: { name: 1, agencia: 1, conta: 1, balance: 1 } },
//         { $sort: { "balance": -1 } },
//         { $limit: 1 },
//       ])
//       );
//     })
//     console.log(privateList);
//     res.send(privateList)
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });



export { app as accountRouter };



