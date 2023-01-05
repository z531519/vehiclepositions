
# Kubernetes and Helm Stuff

Use this to
- optionally install kafka and redis within your Kubernetes Cluster (KIND, minikube, docker-desktop for your local k8s)
- Deploy the built go/java/nodejs docker images into the K8s cluster

## Run Kafka and Redis within K8s

Run 
```
./helm-kafka-redis-deploy.sh
```

Use tools such as `k9s` or `Lens` to visualize activity of said deployments.

## Run the Sample Apps

- Build the images using the supplied `build-image.sh` file on each sample.
- Then run the 
```
./helm-deploy-sample-[go|java|nodejs].sh
```



