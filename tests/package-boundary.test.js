import { RuleTester } from 'eslint';

import rule from '../rules/package-boundary';

import { test as _test, testFilePath } from './utils';

const test = (def) =>
    _test({
        filename: testFilePath('./package-boundary/index.js'),
        ...def,
    });

const ruleTester = new RuleTester();

ruleTester.run('package-boundary', rule, {
    valid: [
        test({
            code: 'import "./a-module"',
        }),
        test({
            code: 'import "./a-module/index"',
        }),
        test({
            code: 'import "./a-module/index.js"',
        }),
        test({
            code: 'import "./b-module/file.js"',
        }),
        test({
            code: 'import "../a-module"',
            filename: testFilePath('./package-boundary/b-module/file.js'),
        }),
        test({
            code: 'import "../file.js"',
            filename: testFilePath('./package-boundary/b-module/file.js'),
        }),
        test({
            code: 'import "./c-module"',
        }),
        test({
            code: 'import "./c-module/file.js"',
        }),
        test({
            code: 'import "esm-package"',
        }),
        test({
            code: 'import "esm-package/esm-module"',
        }),
        test({
            code: 'import "@org/package"',
        }),
        test({
            code: 'import "@org/package/sub-package"',
        }),
    ],

    invalid: [
        test({
            code: 'import "./a-module/file.js"',
            errors: [
                {
                    message: 'Passing module boundary',
                    line: 1,
                    column: 8,
                    suggestions: [
                        {
                            desc: 'Change import to `./a-module`',
                            output: 'import "./a-module"',
                        },
                    ],
                },
            ],
        }),
        test({
            code: 'import "./a-module/sub-a-module/index.js"',
            errors: [
                {
                    message: 'Passing module boundary',
                    line: 1,
                    column: 8,
                    suggestions: [
                        {
                            desc: 'Change import to `./a-module`',
                            output: 'import "./a-module"',
                        },
                    ],
                },
            ],
        }),
        test({
            code: 'import "../a-module/file.js"',
            filename: testFilePath('./package-boundary/b-module/file.js'),
            errors: [
                {
                    message: 'Passing module boundary',
                    line: 1,
                    column: 8,
                    suggestions: [
                        {
                            desc: 'Change import to `../a-module`',
                            output: 'import "../a-module"',
                        },
                    ],
                },
            ],
        }),
        test({
            code: `import "a-module/sub-a-module/index.js"`,
            filename: testFilePath('./package-boundary/a-module/file.js'),
            errors: [
                {
                    message: 'Passing module boundary',
                    line: 1,
                    column: 8,
                    suggestions: [
                        {
                            desc: 'Change import to `a-module`',
                            output: 'import "a-module"',
                        },
                    ],
                },
            ],
        }),
    ],
});
