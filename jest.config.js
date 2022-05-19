// to get timezone sync with server https://github.com/jest-community/vscode-jest/issues/153
process.env.TZ = 'UTC';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    roots: ['<rootDir>/tests'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleDirectories: ['node_modules', path.resolve(__dirname, 'rules')],
    transform: {
        '\\.js$': 'babel-jest',
    },
};
