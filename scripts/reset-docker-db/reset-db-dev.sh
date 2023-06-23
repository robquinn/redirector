#!/usr/bin/env sh

# Bash Script To Reset the Docker (postgresql) Database

# stop all docker containers
echo "stopping all docker containers..."
docker-compose down

# remove all docker components
echo "pruning docker components..."
docker system prune -a --volumes -f

# remove postgres db volume
echo "deleting "./postgres/" docker volume"
sudo rm -rf "$PWD/postgres"

# remove all prisma migrations
echo "deleting prisma migrations ("./prisma/migrations") ..."
sudo rm -rf "$PWD/prisma/migrations"

# start docker-compose and create db
echo "starting docker-compose and re-creating containers..."
docker-compose up -d

# wait for docker container to be ready
echo "pausing execution for 10 seconds to give docker time to fire up..."
sleep 10

# set DATABASE__DB_URL for shell script
export DATABASE__DB_URL="postgresql://alice:wonderland@localhost:5432/myawesomedb"

# lastly, prompt prisma to create and run new migrations
echo "running prisma cli to migrate schema..."
npx prisma migrate dev --preview-feature
