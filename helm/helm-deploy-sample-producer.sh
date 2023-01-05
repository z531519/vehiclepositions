#!/usr/bin/env sh

# installs the vpconsumer-service helm chart

helm upgrade vpproducer service -f values.producer.yaml --install --namespace vpconsumer --create-namespace