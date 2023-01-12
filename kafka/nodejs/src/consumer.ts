import kafka from "./kafka";
import { initRedisClient } from "./redis";

const consumer = kafka.consumer({ groupId: "sample-js-slim-group" });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "vehicle-positions-slimjs" });

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
        const key = message.key?.toString();
        if (key) client.rPush(key, vpraw);
      }
    }
  });
};

export default startConsumer;
