/* eslint-disable */
const { dirname, relative, sep, join } = require('path');

const { default: moduleVisitor, makeOptionsSchema } = require('eslint-module-utils/moduleVisitor');
const { default: resolve } = require('eslint-module-utils/resolve');
const { isExternalModule } = require('eslint-plugin-import/lib/core/importType');

const isRelative = (path) => /^\./.test(path)

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [makeOptionsSchema()],
    },

    create: function moduleBoundary(context) {
        const myPath = context.getPhysicalFilename ? context.getPhysicalFilename() : context.getFilename();
        if (myPath === '<text>') return {}; // can't check a non-file

        function checkSourceValue(sourceNode) {
            const depPath = sourceNode.value;

            if (isExternalModule(depPath, resolve(depPath, context), context)) {
                // don't handle external or scoped modules
                return;
            }

            const absDepPath = resolve(depPath, context);

            if (!absDepPath) {
                // unable to resolve path
                return;
            }

            const isRelativeImport = isRelative(depPath);
            const relDepPath = isRelativeImport ? relative(dirname(myPath), absDepPath): depPath;
            const segments = relDepPath.split(sep); // Break down import path into path segments
            const currentPath = isRelativeImport ? ['.'] : []; // make sure relative path always starts with the current directory

            for (const path of segments) {
                currentPath.push(path);
                const importPath = join(...currentPath)

                if (path === '..') {
                    // don't check relative imports from parent
                    continue;
                }

                const resolvedImportFile = resolve(importPath, context);

                if (absDepPath === resolvedImportFile) {
                    // If resolved path is same as the one we're already tried to import, this is ok and we're done here
                    break;
                }

                if (resolvedImportFile) {
                    // One of the ascendant directories resolved to an index file
                    const relativeImportPath = isRelativeImport ? relative(dirname(myPath), resolvedImportFile) : importPath;

                    const normalisedRelativeImportPath = join('.', relativeImportPath).toLowerCase();
                    if (isRelativeImport && normalisedRelativeImportPath.indexOf(importPath.toLowerCase() + sep) !== 0) {
                        // In case resolved import path is NOT index file inside desired directory
                        // Happens when there's both folder and file with the same module name. In this case
                        // we treat it as false positive and ignore it.
                        continue;
                    }

                    const recommendedImportPath = (
                        (relativeImportPath.indexOf('.') !== 0 && isRelativeImport ? `.${sep}` : '') + relativeImportPath
                    ).replace(/\/index\.(js|jsx|ts|tsx)$/, '');
                    context.report({
                        node: sourceNode,
                        message: `Passing module boundary. Should import from \`${recommendedImportPath}\`.`,
                    });
                    break;
                }
            }
        }

        return moduleVisitor(checkSourceValue, context.options[0]);
    },
};
