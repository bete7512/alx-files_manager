/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-await */
// eslint-disable-next-line no-unused-vars
// import MongoClient from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

import Mongo from 'mongodb';

class DBClient {
  constructor() {
    this._uri = 'mongodb://root:root@localhost:27017';
    this._databaseName = 'admin';
    MongoClient.connect(
      this._uri,
      { useNewUrlParser: true },
      (error, client) => {
        if (error) {
          return console.log('Connection failed for some reason');
        }
        console.log('Connection established - All well');
        this.db = client.db(this._databaseName);
      },
    );

    // this.db = null;
    // this.client = new MongoClient('mongodb://root:root@localhost:27017', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // this.client.connect((err, res) => {
    //   if (err) {
    //     console.log('error', err);
    //   }
    //   this.db = res.db('admin');
    // });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    console.log(
      await this.db
        .collection('users')
        .findOne({ email: 'betekbebe@gmail.com' }),
    );
    return await this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    console.log(await this.db.collection('files').countDocuments());
    return await this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
// (async () => console.log(
//   await dbClient.db.collection('users').findOne({ email: 'betekbebe@gmail.com' }),
// ))();

export default dbClient;
