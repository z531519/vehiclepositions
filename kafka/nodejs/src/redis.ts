import { createClient, RedisClientType } from "redis";
import config from 'config';

let client: RedisClientType;

const initRedisClient = async (): Promise<RedisClientType> => {
  console.log('redis.RedisClientOptions:');
  console.log(config.get("redis.RedisClientOptions"));
  client = createClient(config.get("redis.RedisClientOptions"));

  client.on("error", err => console.log("Redis Client Error", err));

  await client.connect();
  return client;
};

export { initRedisClient, client };
