import { Kafka } from "kafkajs";

import config from 'config';

console.log('KafkaConfig:');
console.log(config.get("kafka.KafkaConfig"));
const kafka = new Kafka(config.get('kafka.KafkaConfig'));

export default kafka;
