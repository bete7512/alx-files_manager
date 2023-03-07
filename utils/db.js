// Disable eslint rules
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-await */

import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();

class DBClient {
  constructor() {
    this._host = process.env.DB_HOST || 'localhost';
    this._port = process.env.DB_PORT || 27017;
    this._uri = `mongodb://${this._host}:${this._port}`;
    this.db = null;
    this._databaseName = process.env.DB_DATABASE || 'files_manager';
    MongoClient.connect(this._uri, {
      useUnifiedTopology: true,
    })
      .then((client) => {
        this.db = client.db(this._databaseName);
        if (!this.db.collection('users')) this.db.createCollection('users');
        if (!this.db.collection('files')) this.db.createCollection('files');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isAlive() {
    return !!this.db;
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
