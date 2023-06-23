#!/usr/bin/env sh

# Bash Script To Reset Dependencies In package.json

# remove yarn.lock
echo "removing yarn.lock"
sudo rm -rf "$PWD/yarn.lock"

# remove yarn-error.log
echo "removing yarn-error.log"
sudo rm -rf "$PWD/yarn-error.log"

# remove node_modules
echo "removing dependencies"
sudo rm -rf "$PWD/node_modules"

# install deps with yarn
echo "installing dependencies with yarn"
yarn install