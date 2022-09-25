import path from 'path';

const packageDir = path.resolve(__dirname, '..');

export function testFilePath(relativePath) {
    return path.join(packageDir, '__fixtures__', 'files', relativePath);
}

const FILENAME = testFilePath('foo.js');

export function test(t) {
    if (arguments.length !== 1) {
        throw new SyntaxError('`test` requires exactly one object argument');
    }
    return Object.assign(
        {
            filename: FILENAME,
        },
        t,
        {
            parserOptions: Object.assign(
                {
                    sourceType: 'module',
                    ecmaVersion: 9,
                    parser: require.resolve('@babel/eslint-parser'),
                },
                t.parserOptions,
            ),
            settings: {
                'import/internal-regex': /^\w-module/,
                'import/resolver': {
                    'node': {
                        paths: [
                            path.join(packageDir, '__fixtures__', 'files', 'package-boundary'),
                            path.join(packageDir, 'node_modules'),
                        ],
                    },
                },
            },
        },
    );
}
