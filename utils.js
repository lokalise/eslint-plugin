import path from 'path';

// warms up the module cache. this import takes a while (>500ms)
import 'babel-eslint';

export function testFilePath(relativePath) {
    return path.join(__dirname, './__fixtures__/files', relativePath);
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
                    parser: require.resolve('babel-eslint'),
                },
                t.parserOptions,
            ),
        },
    );
}
