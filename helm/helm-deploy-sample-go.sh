#!/usr/bin/env sh

# installs the vpconsumer-service helm chart

helm upgrade vpconsumer-go service -f values.go.yaml --install --namespace vpconsumer --create-namespace