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
  } catch (e) {
    console.error(e);
  } finally {
    await mongo.close();
  }
}

async function getUser(email) {
  try {
    await mongo.connect();
    const cursor = mongo
      .db()
      .collection('users')
      .find(
        {
          email: {
            $eq: email
          }
        },
        {
          sort: { email: 1 }, // Sort by email ascending
          projection: { _id: 1, email: 1, fullName: 1, auth0: 1 }
        }
      );
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log('No documents found!');
    }
    return await cursor.toArray();
  } catch (e) {
    console.error(e);
  } finally {
    await mongo.close();
  }
}

export default function handler(req, res) {
  // Get data from your database
  var result = {};

  switch (req.body.crudOption) {
    case 'upsert':
      result = upsertUser({
        fullName: req.body.user.name,
        email: req.body.user.email,
        auth0: req.body.user.sub
      })
        .then(data => {
          return res.status(200).json(data.data);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json(e);
        });
      break;
    case 'read':
      getUser(req.body.user)
        .then(data => {
          return res.status(200).json({ data: data });
        })
        .catch(e => {
          console.error(e);
          res.status(500).json(e);
        });
      break;
    default:
      result = 'No Crud Specified';
      return res.status(200).json({ data: result });
  }
}
