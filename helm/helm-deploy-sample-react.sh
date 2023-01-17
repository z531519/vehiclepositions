#!/usr/bin/env sh

# installs the vpconsumer-service helm chart
. ./common.sh

envsubst < values.react.yaml | helm upgrade vp-app service -f - --install --namespace vpconsumer --create-namespace