#!/usr/bin/env sh

# installs the vpconsumer-service helm chart
. ./common.sh

envsubst < values.nodejs.yaml | helm upgrade vpconsumer-nodejs service -f - --install --namespace vpconsumer --create-namespace