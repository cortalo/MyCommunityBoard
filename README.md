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
```

for the model itself it is easy to use, e.g., `th:if="${commentNotice!=null}"` as filter.
But after inside a map, I need to use `th:if="${day.agendaCounts!=0}"` as filter.

## Production

update the password for sql, email and domain address after production