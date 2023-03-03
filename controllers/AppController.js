/* eslint-disable import/extensions */
import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

const AppController = {
  async getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  },
  async getStats(req, res) {
    res.status(200).json({
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    });
  },
};

export default AppController;
