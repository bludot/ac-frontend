# ac-frontend

The interface for the home air-conditioner controller — set the temperature,
mode, fan and swing, and see what the room is actually doing.

React and TypeScript. It talks to
[ac-backend](https://github.com/bludot/ac-backend), which relays commands to the
unit over MQTT.

## Running it

Requires the Node version in `.nvmrc`.

```sh
yarn install
yarn dev              # dev server
yarn build            # production build
yarn test             # Jest
yarn storybook        # component explorer
yarn build-storybook
```

`docker-compose.yml` runs it alongside the backend; `docker-compose.ci.yml` is
the CI variant.

## Status

Last worked on in 2023.
