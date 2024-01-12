const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'blockvote';

const state = {
    db:null
}
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
    state.db = db
  // the following code examples can be pasted here...
  return db;
}

const get = ()=>state.db

module.exports = {
    main, 
    get
    
}