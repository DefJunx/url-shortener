# url-shortener

Shortens urls and gives a reason to live for my unused domain.

## Development

This project uses Docker and Docker-compose. To start the app, do `docker compose up -d` to run the containers.

## Environment variables

This project has several environment variables, as seen in `.env.example`:

- DB_URL: URL pointing to mongo DB
- NODE_ENV: Node environment
- PORT: the port on which the app is exposed
- DOCKER_NETWORK: This var is needed because on production the reverse proxy is managed using Nginx-proxy-manager. As it's in it own container and network, this here defines the nginx proxy manager netwok name. This has only to be set in production.
- DOCKER_IS_EXTERNAL_NETWORK: To be set to true if it's production, false otherwise.
