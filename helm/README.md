
# Kubernetes and Helm Stuff

Use this to
- optionally install kafka and redis within your Kubernetes Cluster (KIND, minikube, docker-desktop for your local k8s)
- Deploy the built go/java/nodejs docker images into the K8s cluster

## Run Kafka and Redis within K8s

You can host Kafka and Redis within the Kubernetes Cluster.  The default setup is configured to connect to the Kafka/Redis services started up with docker compose.

Run 
```
./helm-kafka-redis-deploy.sh
```

Use tools such as `k9s` or `Lens` to visualize activity of said deployments.

Edit the file `common.sh`, uncomment the section that sets the variables that the sample apps used to connect to the target Kafka and Redis services.

## Run the Sample Apps

- Deploy the producer
```
./helm-deploy-sample.producer.sh
```
- Build the images using the supplied `build-image.sh` file on each sample.
- Then run the target
```
./helm-deploy-sample-[go|java|nodejs].sh
```
- You can have all flavors running
- Enjoy the streaming!





