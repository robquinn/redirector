# Redirector

<p align="center">
<img align="center" width="200" src="docs/images/apollo-logo.png" alt="Express Logo">
<img align="center" width="200" src="docs/images/graphql-logo.png" alt="GraphQL Logo">
</p>

## Table of Contents

- [Redirector](#redirector)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Building](#building)
  - [Running the Server](#running-the-server)
  - [Testing](#testing)
  - [Deploy to Heroku](#deploy-to-heroku)

This repo is a server that redirects a user to a password protected web page, and then automatically logs the user into the web page. The application is written entirely in [TypeScript](https://www.typescriptlang.org/) and features [Apollo Server](https://www.apollographql.com/docs/apollo-server/) built atop [Express](https://expressjs.com/) that exposes a [GraphQL API](https://graphql.org/). The GraphQL Schema in this repo follows the `code-first` philosopy, and uses [GraphQL Nexus](https://nexusjs.org/) to produce said schema. Databasing for the application is done through [Prisma](https://www.prisma.io/), which allows you to change whichever database you use on the fly. For our purposes, we chose a [MySQL](https://www.mysql.com/) database as we get a speical deal on them from a particular provider. The repo implements testing via [Jest](https://jestjs.io/) and is facilitated by the use of [Puppeteer](https://pptr.dev/).

## About

The need for this project was born because we had a company web site that was protected by a password. The inteded users of the website, however, would not and do not know the password. So we needed a way to log users into the website automatically, but only if those users came from a particular origin. Thus, this proxy server was born.

When you navigate to this server, it automatically redirects you to the company web page in question, but it adds a <a href="https://en.wikipedia.org/wiki/Query_string">query string</a> containg a code (i.e. `http:www.companywebsite.com/landingpage?code=the_validating_code_here`). The company web page's landing page features a frontend script that is itself hosted on this server. The script fires off a GraphQL query that essetially asks the server if the code in the query string is valid. If the server returns a valid response (that the code is in fact valid), then the script fills out the password on the landing page and submits the form, logging the user into the website.

Building this repo produces the following bundle:

```text
dist
├── client
│   └── redirector.js
└── server
    └── bundle.js
```

The file `dist/client/redirector.js` is the frontend script which is intended to be included on the landing page of the company website

The file `dist/server/bundle.js` is the server, which exposes the GraphQL API and also hosts the frontend script from above

## Prerequisites

1. You must create an `.env` file based on the `.env.example` file with all the appropriate values
2. You must make sure your database is running (i.e. `docker compose up -d` in development)
   - Install [Docker](https://www.docker.com/) if you need to
3. You must install the depedencies (i.e `pnpm install`)
   - Install [Node](https://nodejs.org/en) if you need to, version `>=18.16.1` and npm version `>=9.7.2`
   - Install [pnpm](https://pnpm.io/installation) if you need to, version `>=8.6.3`

## Install

In order to install the depedencies, run...

```bash
pnpm install
```

## Building

In order to build the repo for development, run...

```bash
pnpm run build:dev
```

In order to build the repo for production (intended for [Heroku](https://www.heroku.com)), run...

```bash
pnpm run build:prod
```

## Running the Server

In order to run the server, run...

```bash
pnpm run start
```

## Testing

In order to run the Unit Tests, run...

```bash
pnpm run test:unit
```

In order to run the integration test, run...

```bash
pnpm run test:integration
```

## Deploy to Heroku

1. You must publish your repo to github
2. You must connect your the github repo to the application in the Heroku as explained [here](https://devcenter.heroku.com/articles/github-integration#enabling-github-integration)
3. You must set the appropriate environment variables in Heroku as explained [here](https://devcenter.heroku.com/articles/config-vars#managing-config-vars)
   - `SERVER__GRAPHQL_PATHNAME` (should be `/graphql`)
   - `SERVER__HOSTNAME` (should be `localhost`)
   - `DATABASE__DB_URL` (should be your Database URL, check out [JawsDB Maria](https://devcenter.heroku.com/articles/jawsdb-maria) for a free DB)
   - `PORTAL__REDIRECT_URL` (your web portal url)
   - `PORTAL__PASSWORD` (your web portal password)
4. You must set the appropriate buildpack, [heroku-buildpack-pnpm](https://github.com/unfold/heroku-buildpack-pnpm)
5. You must deploy the "main" branch as explained [here](https://devcenter.heroku.com/articles/github-integration#manual-deploys)
6. The `Procfile` will take care of starting the app and migrating the database
