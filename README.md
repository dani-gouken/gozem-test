# GOZEM Technical assesment

## Requirement to test

- MongoDB or Docker
- Node JS (18+)
- Angular CLI

## Getting started

### API

Open a terminal in the api folder
copy the `.env.example` file and rename it to `.env`
updates the variable according to your environment. if you are using docker, then you can keep the default ones

```
APP_PORT=3000
DB_USERNAME=root
DB_PASSWORD=root
DB_HOST=mongodb
DB_NAME=gozem
DB_PORT=27017
```

- if you are in a unix environement and you have docker installed, run:
  `make up`
- otherwise, if you have docker installed run
  `docker compose up -d`
- else
  run `npm i`
  then `npm run start`


### Web

MAKE SURE YOU HAVE THE ANGULAR CLI INSTALLED

open the web folder and run
`ng serve`
the web admin expects the api to run on port `3000`


THANK YOU!