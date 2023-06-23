#! /bin/sh
# Script to generate .env.example

# Remove the values from env vars in .env
sed -r '/(SERVER__PORT|SERVER__HOSTNAME|SERVER__GRAPHQL_PATHNAME)=.*/!s/(.*\=\")(.*)(\")/\1\3/g' .env >.env.example
