const { MongoClient } = require('mongodb');

const url = 'mongodb://0.0.0.0:27017/';
let client;
let db;

async function connectToDatabase() {
  try {
    client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('employee');
const Collection =db.collection('employees')
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();

 module.exports=db