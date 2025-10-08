## MySQL

```
docker container run --name mymysql \
-e MYSQL_ROOT_PASSWORD=mypassword \
-v mysql_data:/var/lib/mysql \
-p 3306:3306 \
-d mysql:8.0

docker container exec -it mymysql mysql -u root -p

create database community;
use community;
source init_shema.sql
source init_data.sql
```

## Redis

```
# Run Redis container
docker container run --name myredis \
-v redis_data:/data \
-p 6379:6379 \
-d redis:7.2

# Connect to Redis CLI
docker container exec -it myredis redis-cli
127.0.0.1:6379> exit
```

for the model itself it is easy to use, e.g., `th:if="${commentNotice!=null}"` as filter.
But after inside a map, I need to use `th:if="${day.agendaCounts!=0}"` as filter.

## Kafka

```
# Create a network for Kafka and Zookeeper
docker network create kafka-network

# Run Zookeeper
docker container run --name myzookeeper \
-p 2181:2181 \
--network kafka-network \
-e ZOOKEEPER_CLIENT_PORT=2181 \
-e ZOOKEEPER_TICK_TIME=2000 \
-d confluentinc/cp-zookeeper:latest

# Use version 7.4.0 which supports Zookeeper
docker run -d --name mykafka \
--network kafka-network \
-p 9092:9092 \
-e KAFKA_BROKER_ID=1 \
-e KAFKA_ZOOKEEPER_CONNECT=myzookeeper:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
-e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT \
-e KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka:7.4.0

docker exec -it mykafka kafka-topics --create \
--bootstrap-server localhost:9092 \
--replication-factor 1 \
--partitions 1 \
--topic test

docker exec -it mykafka kafka-topics --list \
--bootstrap-server localhost:9092

# Start Zookeeper first, then Kafka
docker container start myzookeeper
docker container start mykafka
```

## Production

update the password for sql, email and domain address after production