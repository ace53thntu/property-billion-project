# Property server

## Requirements:
* docker
* docker-compose
* nodejs v14

## Quick Start

* Run this command `docker-compose up -d` for `database`
* Run this command `yarn dev` for run server in development

## Access to postgres:
* `localhost:5432`
* **Username:** as `POSTGRES_USER`
* **Password:** as `POSTGRES_PASSWORD`

## Access to PgAdmin: 
* **URL:** `http://localhost:5555`
* **Username:** as `PGADMIN_DEFAULT_EMAIL`
* **Password:** as `PGADMIN_DEFAULT_PASSWORD`

## Add a new server in PgAdmin:
* **Host name/address** `postgres`
* **Port** `5432`
* **Username** as `POSTGRES_USER`
* **Password** as `POSTGRES_PASSWORD`