require('dotenv').config();
// Mongo DB setup
const { MongoClient } = require('mongodb');

let db;

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb+srv://cs649mongouser:mongopwd@self-learn-cluster.df4am.mongodb.net/cs649-inventory-management?retryWrites=true';
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

function getDb() {
  return db;
}

module.exports = { getNextSequence, connectToDb, getDb };
