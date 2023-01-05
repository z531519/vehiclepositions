
Training Project using assorted Technologies

- NodeJS
- Typescript
- KafkaJS

The sample application does the following
- Reads off kafka topic `vehicle-positions` topic and transforming the record and sending it to topic `vehicle-positions-slimjs`
- Uses [confluent-kafka go module](https://github.com/confluentinc/confluent-kafka-go) which uses librdkafka.

### Running the app

(Make sure you got the kafka and redis services running)

Follow instruction on installing the librdkafka library as referenced in the link above.  To run the application

```
  npm run start
```


You should be able to see some console activity as well as inspecting the topics and also the redisdb entries.  Lots of tools for that but I use VSCode tools for Kafka and Redis for quick browsing.