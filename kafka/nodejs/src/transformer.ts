import kafka from "./kafka";

const consumer = kafka.consumer({ groupId: "sample-js-group" });

const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionalId: "sample-js-producer"
});

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
