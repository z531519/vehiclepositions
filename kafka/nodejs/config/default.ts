import { ConsumerConfig, KafkaConfig } from "kafkajs";
import { RedisClientOptions } from "redis";

const config = {
  kafka: {
    KafkaConfig: {
      clientId:  "sample-js-app",
      brokers: ["kafka:9092"]
    } as KafkaConfig,
    ConsumerConfig: {
      groupId: "sample-js-consumer"
    } as ConsumerConfig
  },
  redis: {
    RedisClientOptions: {
      url: "redis://localhost:6379",
      database: 3
    } as RedisClientOptions,    
  }
}

// Env Var Overrides
process.env.CLIENT_ID ? config.kafka.KafkaConfig.clientId = process.env.CLIENT_ID: undefined;
process.env.BOOTSTRAP_SERVERS ? config.kafka.KafkaConfig.brokers = [process.env.BOOTSTRAP_SERVERS]: undefined;
process.env.CONSUMER_GROUP ? config.kafka.ConsumerConfig.groupId = process.env.CONSUMER_GROUP: undefined;

process.env.REDIS ? config.redis.RedisClientOptions.url = process.env.REDIS: undefined;
process.env.REDIS_DB ? config.redis.RedisClientOptions.database = parseInt(process.env.REDIS_DB): undefined;


module.exports = config;