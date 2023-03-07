/* eslint-disable import/extensions */
import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

const AppController = {
  async getStatus(req, res) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    res.status(200).send({ redis, db });
  },
  async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.status(200).send({ users, files });
  },
};

export default AppController;
