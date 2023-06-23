# Powershell Script To Reset the Docker (postgresql) Database

# stop all docker containers
docker-compose down
# remove all docker components
docker system prune -a -f
# remove postgres db volume
Remove-Item -Path "./postgresql/" -Recurse -Force
# remove all prisma migrations
Remove-Item -Path "./prisma/migrations" -Recurse -Force
# start docker-compose and create db
docker-compose up -d
# wait for docker container to be ready
Start-Sleep -s 10
# lastly, prompt prisma to create and run new migrations
npx prisma migrate dev --preview-feature