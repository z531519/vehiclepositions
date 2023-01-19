# training


Training Project using assorted Technologies

- Java/Golang/NodeJS
- Services
  - Kafka
  - Data/Redis
- Containerization
  - Docker/Compose
  - Helm Charts
- React App
  - Plain React
  - NextJS implementation on nextjs branch


The project uses docker to establish the kafka and redis services the application uses to interact with.  You can startup the process with

```sh
startup.sh
```

This will spin up the services, it will also create the topic `vehicle-positions` and then it will startup the producer using this image `proton69/java-producer:paramsV2`.

Source of this producer image is located here https://github.com/ramdhakne/cp-kafka

- Jump to [Java](kafka/java/)
- Jump to [Golang](kafka/go/)
- Jump to [NodeJS](kafka/nodejs/)


The sample applications basically reads off a topic `vehicle-positions` and eventually sends the records to RedisDB.  Some rudimentary API is provided as well to inspect entries stored in Redis.

Each sample folder contains a `docker` folder.  This is used to build a local docker image that you can use to run the app as a container.  The built image is also used if you want to exercise this sample within a kubernetes cluster as demoed under the `helm` folder.

A Front-End React App can be used that works with the NodeJS API/Consumer app.  There are two flavors provided:
- Jump to [Plain React](react-app/)
- Jump to [NextJS]()(../nextjs/react-app/)

# Kubernetes

You can also deply all these sample apps into a kubernetes cluster.  We use helm to manage deployment of these apps (and optionally kafka and redis as well).  Jump to [Helm](./helm/) to get going.

