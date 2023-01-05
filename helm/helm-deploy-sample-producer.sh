#!/usr/bin/env sh

# installs the vpconsumer-service helm chart

. ./common.sh

envsubst < values.producer.yaml | helm upgrade vpproducer service -f - --install --namespace vpconsumer --create-namespace