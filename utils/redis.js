<<<<<<< HEAD
import { promisify } from 'util';
import { createClient } from 'redis';
=======
import redis from 'redis';
import { promisify } from 'util';
>>>>>>> ca34051d747aa3c34f05dc738f7c54d47eac4855

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance.
   */
  constructor() {
<<<<<<< HEAD
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
=======
    this.client = redis.createClient();
    this.get = promisify(this.client.get).bind(this.client);
    this.isConnected = false;
>>>>>>> ca34051d747aa3c34f05dc738f7c54d47eac4855
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean}
   */
  isAlive() {
<<<<<<< HEAD
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a given key.
   * @param {String} key The key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores a key and its value along with an expiration time.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The item to store.
   * @param {Number} duration The expiration time of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
=======
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
>>>>>>> ca34051d747aa3c34f05dc738f7c54d47eac4855
}

export const redisClient = new RedisClient();
export default redisClient;
