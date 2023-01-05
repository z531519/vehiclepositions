
Training Project using assorted Technologies

- Golang

The sample application does the following
- Reads off kafka topic `vehicle-positions` topic and persisting the record into Redis DB
- Uses [confluent-kafka go module](https://github.com/confluentinc/confluent-kafka-go) which uses librdkafka.

### Running the app

(Make sure you got the kafka and redis services running)

Follow instruction on installing the librdkafka library as referenced in the link above.  To run the application

```
  go run -tags dynamic ./...
```

I find the dynamic tag needs to be set when i installed librdkafka with `brew`.  (https://github.com/confluentinc/confluent-kafka-go/blob/master/kafka/README.md)
