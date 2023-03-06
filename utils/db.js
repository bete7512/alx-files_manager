// Disable eslint rules
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-await */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    this._uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
    this._databaseName = process.env.DB_DATABASE;
    this.isConnected = false;
    MongoClient.connect(this._uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((client) => {
        this.db = client.db(this._databaseName);
        this.isConnected = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    return await this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return await this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
