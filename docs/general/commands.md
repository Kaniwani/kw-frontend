# Command Line Commands

## Initialization

```Shell
yarn install
```

Installs the dependencies.

## Development

```Shell
yarn run start
```

Starts the development server running on `http://localhost:3000`

## Generators

```Shell
yarn run generate
```

Allows you to auto-generate boilerplate code for common parts of your
application, specifically `component`s, `container`s, and `route`s. You can
also run `yarn run generate <part>` to skip the first selection. (e.g. `yarn run
generate container`)

## Server

### Development

```Shell
yarn start
```

Starts the development server and makes your application accessible at
`localhost:3000`. Tunnels that server with `ngrok`, which means the website
accessible anywhere! Changes in the application code will be hot-reloaded.

### Production

```Shell
yarn run start:production
```

Starts the production server, building the app for optimal performance: assets are
minified and served gzipped.

### Port

To change the port the app is accessible at pass the `--port` option to the command
with `--`. E.g. to make the app visible at `localhost:5000`, run the following:
`yarn start -- --port 5000`

## Building

```Shell
yarn run build
```

Preps your app for deployment. Optimizes and minifies all files, piping them to
a folder called `build`. Upload the contents of `build` to your web server to
see your work live!

## Testing

See the [testing documentation](../testing/README.md) for detailed information
about our testing setup!

## Unit testing

```Shell
yarn run test
```

Tests your application with the unit tests specified in the `*test.js` files
throughout the application.  

```Shell
# Run tests and watch for changes, optionally match by pattern.
# Jest will display the available commands to you once you've started
yarn run test:watch
```

Watches changes to your application and reruns tests whenever a file changes.

### Remote testing

```Shell
yarn run start:tunnel
```
Starts the development server and tunnels it with `ngrok`, making the website
available on the entire world. Useful for testing on different devices in different locations!

### Dependency size test

```Shell
yarn run analyze
```

This command will generate a `stats.json` file from your production build, which
you can upload to the [webpack analyzer](https://webpack.github.io/analyse/). This
analyzer will visualize your dependencies and chunks with detailed statistics
about the bundle size.

## Linting

```Shell
yarn run lint
```

Lints your JavaScript.
