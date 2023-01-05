import { Kafka } from "kafkajs";
import * as dotenv from "dotenv";

const kafka = new Kafka({
  clientId: "sample-js-app",
  brokers: [process.env.BOOTSTRAP_SERVERS || "localhost:9092"]
});

export default kafka;
