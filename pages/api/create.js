const { MongoClient } = require('mongodb');

async function dbConnect() {
  const mongo = new MongoClient(process.env.MONGO_DB_URI);
  try {
    await mongo.connect();
    await createListing(mongo, {
      name: 'Racoon',
      age: '3',
      breed: 'Racoon'
    });
  } catch (e) {
    console.error(e);
  } finally {
    mongo.close();
  }
}

async function createListing(mongo, newListing) {
  const result = await mongo.db().collection('users').insertOne(newListing);

  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(mongo) {
  const databasesList = await mongo.db().admin().listDatabases();
  console.log('Databases:');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

export default function handler(req, res) {
  // Get data from your database
  dbConnect().catch(e => console.error(e));

  res.status(200).json('Connected to DB');
}
