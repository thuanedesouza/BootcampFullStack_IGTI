
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thuane:12830@cluster0.revsp.mongodb.net/grades?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(async (err) => {

  // obter coleção de documentos
  const collection = client.db('sample_restaurants').collection('restaurants');
  // buscar documentos em que a cozinha é chinesa
  const documents = await collection.find({ cuisine: "Chinese" }).toArray();
  //console.log(documents);

  //buscar a lista dos bancos do meu server, faz a mesma coisa que show dbs
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases:");

  databaseList.databases.forEach(db => {
    console.log(`- ${db.name}`)
  });
  client.close();

});
