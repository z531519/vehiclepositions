
Training Project using assorted Technologies

- Java
- Spring Boot
  - Kafka
  - Data/Redis
- Containerization
  - Docker/Compose
  - Helm Charts


The project uses docker to establish the kafka and redis services the application uses to interact with.  You can startup the process with

```sh
startup.sh
```

This will spin up the services, it will also create the topic `vehicle-positions` and then it will startup the producer using this image `proton69/java-producer:paramsV2`.

Source of this producer image is located here https://github.com/ramdhakne/cp-kafka


The sample application does the following
- create a stream reading off the `vehicle-positions` topic and transforming value and sending it to `vehicle-positions-slim`
- a consumer reads off `vehicle-position-slim` and then writes the entry to Redis


The application is configured with gradl.  It can be started with
```
gradle bootRun
```

# Kubernetes
The `docker` folder has the source for fully deploying this into a kubernetes cluster.  I use the basic docker-desktop kube cluster but it should work with KIND and minikube.

```sh
build-image.sh # builds the docker image vpconsumer/latest
helm-kafka-redis-deploy.sh # deploy kafka/redis to kubernetes cluster
helm-deploy.sh # deploy this application to kubernetes using helm charts
```

This showcases the applications and services all running within a kubernetes environment.

