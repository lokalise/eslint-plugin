# eslint-plugin

![npm](https://img.shields.io/npm/v/@lokalise/eslint-plugin)
![Downloads total](https://img.shields.io/npm/dt/@lokalise/eslint-plugin)

## Install in your app

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@lokalise/eslint-plugin`:

```
$ npm i @lokalise/eslint-plugin --save-dev
```

### Usage

Add `@lokalise/eslint-plugin` to the plugins section of your `.eslintrc` configuration file.

```json
{
    "plugins": [
        "@lokalise/eslint-plugin"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@lokalise/package-boundary": "error",
    }
}
```

## Local Development

### Install Deps

```
$ npm i
```

### Run tests

```
$ npm run test
```

## Supported Rules

* [@lokalise/package-boundary](docs/rules/package-boundary.md): Ensures all the imports and exports happen through index.

## License

This library is licensed under [MIT](https://github.com/lokalise/eslint-plugin/blob/main/LICENSE).

Copyright (c) [Lokalise Group](http://lokalise.com)
