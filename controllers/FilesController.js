/* eslint-disable import/extensions */
/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';
import { v4 } from 'uuid';
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

const FilesController = {
  async postUpload(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(userId);
    const user = await dbClient.db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // const {
    //   name, type, data,
    // } = req.body;
    // let {
    //   parentId, isPublic,
    // } = req.body;
    // if (!name) {
    //   return res.status(400).json({ error: 'Missing name' });
    // }
    // if (!type) {
    //   return res.status(400).json({ error: 'Missing type' });
    // }
    // if (!parentId) parentId = 0;
    // if (!isPublic) isPublic = false;
    // const fileTypes = ['folder', 'file', 'image'];
    // if (!type || !fileTypes.includes(type)) {
    //   return res.status(400).json({ error: 'Missing type' });
    // }
    // if (!data && type !== 'folder') {
    //   return res.status(400).json({ error: 'Missing Data' });
    // }
    // if (parentId) {
    //   const parent = await dbClient.findFile({ _id: ObjectID(parentId) });

    //   if (!parent) return res.status(400).json({ error: 'Parent not found' });

    //   if (parent.type !== 'folder') {
    //     return res.status(400).json({ error: 'Parent is not a folder' });
    //   }
    // }
    // const fileData = {
    //   userId,
    //   name,
    //   type,
    //   parentId,
    //   isPublic,
    // };

    // if (type !== 'folder') {
    //   fileData.data = data;
    //   fileData.path = await writeFile(v4(), data, type);
    // }

    // const newFile = await dbClient.uploadFile(fileData);

    // if (type === 'image') await fileQueue.add(newFile);

    // newFile.id = newFile._id;
    // delete newFile._id;
    // delete newFile.data;
    // delete newFile.path;

    // return res.json(newFile);
  },
};
export default FilesController;
