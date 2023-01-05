#!/usr/bin/env sh

## installs redis and confluent kafka using helm chart

helm repo add bitnami https://charts.bitnami.com/bitnami
helm install redis bitnami/redis --set auth.enabled=false,replica.replicaCount=1

helm repo add confluentinc https://confluentinc.github.io/cp-helm-charts/ 

helm upgrade confluent confluentinc/cp-helm-charts --install --namespace confluent \
  -f helm-kafka-values.yaml \
  --set cp-kafka-rest.enabled=false,cp-kafka-connect.enabled=false,cp-ksql-server.enabled=false \
  --set cp-kafka.brokers=1,cp-zookeeper.servers=1 \
  --create-namespace