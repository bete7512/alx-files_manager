// eslint-disable-next-line no-unused-vars
import { MongoClient } from 'mongodb';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    this._db = null;
  }

  async connect() {
    if (this._db) {
      return this._db;
    }

    const client = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    this._db = client.db(process.env.MONGO_DB_NAME);
    // check client is connected or not
    console.log('am from there',client.isConnected());

    return this._db;
  }

  isAlive() {
    return this._db !== null;
  }

  async nbUsers() {
    // eslint-disable-next-line no-return-await
    return await this._db.collection('users').countDocuments();
  }

  async nbFiles() {
    // eslint-disable-next-line no-return-await
    return await this._db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
