/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import shal from 'sha1';
import dbClient from '../utils/db.js';

const UsersController = {
  async postNew(req, res) {
    const email = req.body.email ? req.body.email : null;
    const password = req.body.password ? req.body.password : null;

    if (!email) { return res.status(400).json({ error: 'Missing email' }); }
    if (!password) { return res.status(400).json({ error: 'Missing password' }); }
    const userExists = await dbClient.db.collection('users').findOne({ email });
    if (userExists) { return res.status(400).json({ error: 'Already exist' }); }

    const hashedPassword = await shal(password);

    try {
      const user = await dbClient.db.collection('users').insertOne({
        email,
        password: hashedPassword,
      });

      //   console.log(user);
      //   console.log(user.ops[0]._id, user.ops[0].email);
      return res.status(201).json({
        id: user.ops[0]._id,
        email: user.ops[0].email,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' });
    }
  },
  async getMe(req, res) {
    const token = req.headers['x-token'];
    if (!token) { return res.status(401).json({ error: 'Unauthorized' }); }
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) { return res.status(401).json({ error: 'Unauthorized' }); }
    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) { return res.status(401).json({ error: 'Unauthorized' }); }
    console.log(user);
    return res.status(200).json({
      id: user._id,
      email: user.email,
    });
  },
};

export default UsersController;
