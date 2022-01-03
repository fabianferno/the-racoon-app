const { MongoClient } = require('mongodb');
const mongo = new MongoClient(process.env.MONGO_DB_URI);

async function upsertUser(user) {
  try {
    await mongo.connect();
    const result = await mongo
      .db()
      .collection('users')
      .updateOne({ email: user.email }, { $set: user }, { upsert: true });

    return result;
    // console.log(`New listing created with the following id: ${result.insertedId}`);
  } catch (e) {
    console.error(e);
  } finally {
    mongo.close();
  }
}

async function getUser(user) {
  try {
    await mongo.connect();
    const result = mongo.db().collection('users').find({ email: user.email });
    console.log(result);
    return result;
    // console.log(`New listing created with the following id: ${result.insertedId}`);
  } catch (e) {
    console.error(e);
  } finally {
    mongo.close();
  }
}

export default function handler(req, res) {
  // Get data from your database
  var user = req.body.user;
  // console.log(user);
  var result;

  switch (req.body.crudOption) {
    case 'upsert':
      result = upsertUser({
        fullName: user.name,
        email: user.email,
        auth0: user.sub
      }).catch(e => console.error(e));
      break;
    case 'read':
      result = getUser({
        email: user.email
      }).catch(e => console.error(e));
      break;
    case 'delete':
      result = deleteUser(user).catch(e => console.error(e));
      break;
    default:
      result = 'No Crud Specified';
  }

  res.status(200).json({ data: result, status: 'Works' });
}
