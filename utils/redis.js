import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
  }

  isAlive() {
    return this.client.ready && this.client.connected;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }

  set(key, value, expire) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) {
          reject(err);
        }
        if (expire > 0) {
          this.client.expire(key, expire);
        }
        resolve(reply);
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
