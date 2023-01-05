#!/usr/bin/env sh

# installs the vpconsumer-service helm chart
. ./common.sh

envsubst < values.java.yaml | helm upgrade vpconsumer-java service -f - --install --namespace vpconsumer --create-namespace