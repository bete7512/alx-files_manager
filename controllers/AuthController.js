/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import shal from 'sha1';
import { v4 } from 'uuid';
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

const AuthController = {
  getConnect: async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const [authType, authValue] = authHeader.split(' ');
    if (authType !== 'Basic') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const [email, password] = Buffer.from(authValue, 'base64').toString().split(':');
    if (!email || !password) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const hashed = await shal(password);
    const user = await dbClient.db.collection('users').findOne({ email, password: hashed });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = v4();
    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    console.log(token);
    return res.status(200).json({ token });
  },
  getDisconnect: async (req, res) => {
    const token = req.headers['x-token'];
    console.log(token);
    if (!token) {
      console.log('no header');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      console.log('no user');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await redisClient.del(`auth_${token}`);
    return res.status(200).json({ message: 'Disconnected' });
  },
};

export default AuthController;
