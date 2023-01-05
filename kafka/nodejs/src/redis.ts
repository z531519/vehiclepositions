import { createClient, RedisClientType } from "redis";

let client: RedisClientType;

const initRedisClient = async (): Promise<RedisClientType> => {
  client = createClient({
    url: process.env.REDIS || "redis://localhost:6379",
    database: parseInt(process.env.REDIS_DB || "3")
  });

  client.on("error", err => console.log("Redis Client Error", err));

  await client.connect();
  return client;
};

export { initRedisClient, client };
