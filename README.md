# Inventory Management Platform

### Technology Stack
- [ReactJs (Hooks)](https://reactjs.org/docs/hooks-intro.html) + [Typescript](https://www.typescriptlang.org/docs/), [MaterialUI](https://material-ui.com/)
- [ExpressJs](https://expressjs.com/) + [Typescript](https://www.typescriptlang.org/docs/)
- [Postgres](https://www.postgresql.org/), [Sequelize](https://sequelize.org/), [Sqitch](https://sqitch.org/about/) db version control
- [Docker](https://docs.docker.com/)
- [Auth0](https://auth0.com/)

### Run Project
1. `cd` in to project directory where the `docker-compose.yml` file is. There are no seperate (dev/production) compose files for this project.
2. `docker-compose build api`
3. `docker-compose build web`

Step 2 and 3 are only required to run the first time you start the project, or whenever you add a new package.

4. `docker-compose up`

### Add Package
Stop docker-compose first, `docker-compose down`.

If you want to add a package for the client side:
1. `cd frontend`
2. `yarn add <package>`
3. `docker-compose build web`

If you want to add package for the server side:
1. `cd backend`
2. `yarn add <package>`
3. `docker-compose build api`

### Database Migration
```
# If you want to generate migration files
1. cd migration
2. docker-compose run sqitch add <migration_file_name> -n <description>
ex: docker-compose run sqitch add quantity -n 'Add quantity column to inventories table'
This will generate a file called 'quantity.sql'

# Deploy
docker-compose run sqitch deploy db:pg://<pg_user>:<pg_password>@db:5432/inventa_db

# Revert
docker-compose run sqitch revert db:pg://<pg_user>:<pg_password>@db:5432/inventa_db
```

### Test
For this project, I used docker to run the tests. Create test docker containers locally to run the tests.
1. `docker-compose -p tests up db` to set up the test database.
2. `docker-compose -p tests run --rm sqitch deploy db:pg://<pg_user>:<pg_password>@db:5432/inventa_db ` to deploy to the test database.
3. Below:

```
# test all files
docker-compose -p tests run --rm api yarn test:unit

# test 1 file
docker-compose -p tests run --rm api yarn test:unit -- <file_name_to_test>
```
If you face duplicate errors then you need to clean up the test's docker volume:
1. `docker ps` to get the container name.
2. `docker stop <container_name>`, container name should be 'tests_db_1' unless you changed the name of the service.
3. `docker rm <container_name>`, container name should be 'tests_db_1'
4. `docker volume ls` to get the volume name
5. `docker volume rm <volume_name>`, volume name should be 'tests_postgres_data'
