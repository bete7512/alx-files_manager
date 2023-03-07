import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.get = promisify(this.client.get).bind(this.client);
    this.isConnected = false;
  }

  isAlive() {
    if (this.client.on('connect', () => true)) return true;
    return false;
  }

  async get(key) {
    return this.get(key, (err, reply) => reply);
  }

  async set(key, value, duration) {
    return this.client.set(key, value, 'EX', duration);
  }

  async del(key) { return this.client.del(key); }
}

const redisClient = new RedisClient();
export default redisClient;
