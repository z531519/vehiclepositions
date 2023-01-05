
Training Project using assorted Technologies

- Java
- Spring Boot
  - Kafka
  - Data/Redis
- Containerization
  - Docker/Compose
  - Helm Charts


The sample application does the following
- create a stream reading off the `vehicle-positions` topic and transforming value and sending it to `vehicle-positions-slim`
- a consumer reads off `vehicle-position-slim` and then writes the entry to Redis


The application is configured with gradl.  It can be started with
```
gradle bootRun
```

You should be able to see some console activity as well as inspecting the topics and also the redisdb entries.  Lots of tools for that but I use VSCode tools for Kafka and Redis for quick browsing.