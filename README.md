# shopify-internship-2022-backend-and-infra
Evie Lee's submission for the Shopify 2022 Internship Backend and Infrastructure Challenges ([Backend](https://jobs.smartrecruiters.com/Shopify/743999796499290-backend-developer-intern-summer-2022-remote-us-canada-), [Infrastructure](https://jobs.smartrecruiters.com/Shopify/743999796518501-infrastructure-site-reliability-engineering-intern-summer-2022-remote-us-canada-)).

## How to run locally

### Dependencies

You'll need a Postgres server listening on port 3000.
You can run one in a docker container using:

```shell
docker run --name some-postgres -e POSTGRES_PASSWORD=password \
  --mount type=bind,source="$(pwd)/db_script.sql",target=/docker-entrypoint-initdb.d/db_script.sql \
  -p 3000:5432 \
  -d \
  postgres
```

### Server

Run:

```shell
npm install
node server.js
```

Open a browser and navigate to http://localhost:5432/.

## Production

[Hosted on Heroku](https://shopify-intern-back-infra-2022.herokuapp.com/).
