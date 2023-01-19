import kafka from "./kafka";
import config from "config";

const consumer = kafka.consumer( config.get("kafka.ConsumerConfig"));

const producer = kafka.producer( config.get("kafka.ProducerConfig"));

async function sendPayload(vehiclePosition: any) {
  try {
    await producer.send({
      topic: "vehicle-positions-slimjs",
      messages: [
        {
          key: String(vehiclePosition.veh),
          value: JSON.stringify(vehiclePosition)
        }
      ]
    });
  } catch (e) {
    console.error("Caught Error while sending:", e);
  }
}

const startTransformer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "vehicle-positions" });

  await producer.connect();

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // console.log("Received: ", {
      //   partition,
      //   offset: message.offset,
      //   value: message?.value?.toString()
      // });
      if (message.value) {
        const vp: any = JSON.parse(message.value.toString());
        await sendPayload(vp.VP);
      }
    }
  });
};

export default startTransformer;
