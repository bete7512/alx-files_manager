/* eslint-disable import/extensions */
import redisClient from './utils/redis.js';

(async () => {
  console.log(redisClient.isAlive());
  console.log('before set', await redisClient.get('myKey'));
  await redisClient.set('myKey', 12, 5);
  console.log('after set', await redisClient.get('myKey'));

  setTimeout(async () => {
    console.log(await redisClient.get('myKey'));
  }, 1000 * 10);
  console.log('from delete', await redisClient.del('myKey'));
  console.log('after delete', await redisClient.get('myKey'));
})();