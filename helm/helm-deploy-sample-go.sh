#!/usr/bin/env sh

# installs the vpconsumer-service helm chart
. ./common.sh

envsubst < values.go.yaml | helm upgrade vpconsumer-go service -f - --install --namespace vpconsumer --create-namespace