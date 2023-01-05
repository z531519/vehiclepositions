#!/usr/bin/env sh

# installs the vpconsumer-service helm chart

helm upgrade vpconsumer-java service -f values.java.yaml --install --namespace vpconsumer --create-namespace