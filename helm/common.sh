

### as deployed in K8s
# export BOOTSTRAP_SERVERS=confluent-cp-kafka.confluent:9092
# export REDIS=redis-master.default

### using the external services as provisioned by docker-compose
export BOOTSTRAP_SERVERS=host.docker.internal:39092
export REDIS=host.docker.internal
export API_URL=http://localhost:8080