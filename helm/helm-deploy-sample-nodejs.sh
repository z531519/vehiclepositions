#!/usr/bin/env sh

# installs the vpconsumer-service helm chart

helm upgrade vpconsumer-nodejs service -f values.nodejs.yaml --install --namespace vpconsumer --create-namespace