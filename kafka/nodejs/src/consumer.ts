import kafka from "./kafka";
import { initRedisClient } from "./redis";
import config from 'config';

const consumer = kafka.consumer( config.get("kafka.ConsumerConfig"));

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({topic: "vehicle-positions-slimjs", fromBeginning: true });

  const client = await initRedisClient();

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // console.log("Received: ", {
      //   partition,
      //   offset: message.offset,
      //   value: message?.value?.toString()
      // });
      if (message.value) {
        const vpraw = message.value.toString();
        const vp = JSON.parse(vpraw);
        const veh = message.key;
        const oday = vp.oday;
                
        client.sAdd(`veh:oday:${veh}`, oday);
        client.rPush(`veh:geo:${veh}:${oday}`, vpraw);        
      }
    }
  });
};

export default startConsumer;
