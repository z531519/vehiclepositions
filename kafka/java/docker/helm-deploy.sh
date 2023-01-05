#!/usr/bin/env sh

# installs the vpconsumer-service helm chart

helm upgrade vpconsumer helm/vpconsumer-service -f helm/vpconsumer-service/values.tilt.yaml --install --namespace vpconsumer --create-namespace