import { RuleTester } from 'eslint';
import rule from '../rules/relative-internal-imports';
import { test as _test, testFilePath } from './utils';

const test = (def) =>
    _test({
        filename: testFilePath('./internal-modules/a-module/index.js'),
        paths: [testFilePath('internal-modules')],
        ...def,
    });

const ruleTester = new RuleTester();

ruleTester.run('relative-internal-imports', rule, {
    valid: [
        test({
            code: 'import "./file.js"',
        }),
        test({
            code: 'import "file.js"',
        }),
        test({
            code: 'import "b-module/file.js"',
        }),
        test({
            filename: testFilePath('./internal-modules/b-module/file.js'),
            code: 'import "a-module/sub-a-module/file.js"',
        }),
    ],

    invalid: [
        test({
            code: 'import "a-module/file.js"',
            output: 'import "./file.js"',
            errors: [
                {
                    message: 'Importing internal module with absolute path',
                    line: 1,
                    column: 8,
                },
            ],
        }),
        test({
            code: 'import "a-module/file"',
            output: 'import "./file"',
            errors: [
                {
                    message: 'Importing internal module with absolute path',
                    line: 1,
                    column: 8,
                },
            ],
        }),
        test({
            filename: testFilePath(
                './internal-modules/a-module/sub-a-module/file.js',
            ),
            code: 'import "a-module/file.js"',
            output: 'import "../file.js"',
            errors: [
                {
                    message: 'Importing internal module with absolute path',
                    line: 1,
                    column: 8,
                },
            ],
        }),
    ],
});
