/* eslint-disable import/extensions */
/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import ObjectId from 'mongodb';
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

const FilesController = {
  async postUpload(req, res) {
    const token = req.headers['x-token'];
    if (!token) { return res.status(401).json({ error: 'Unauthorized' }); }
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) { return res.status(401).json({ error: 'Unauthorized' }); }
    console.log(userId);
    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) { return res.status(401).json({ error: 'Unauthorized' }); }
  },
};
export default FilesController;
