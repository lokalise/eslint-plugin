/* eslint-disable */
const { dirname, relative, sep, extname } = require('path');

const { default: moduleVisitor, makeOptionsSchema } = require('eslint-module-utils/moduleVisitor');
const { default: resolve } = require('eslint-module-utils/resolve');
const { default: pkgDir } = require('eslint-module-utils/pkgDir');
const { isExternalModule } = require('eslint-plugin-import/lib/core/importType');

const isRelative = (path) => /^\./.test(path)

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [makeOptionsSchema()],
        fixable: true,
    },

    create: function moduleBoundary(context) {
        const myPath = context.getPhysicalFilename ? context.getPhysicalFilename() : context.getFilename();
        if (myPath === '<text>') return {}; // can't check a non-file

        const rootDir = pkgDir(myPath);

        function checkSourceValue(sourceNode) {
            const depPath = sourceNode.value;

            if (isExternalModule(depPath, resolve(depPath, context), context) || isRelative(depPath)) {
                // don't handle external or scoped modules and relative paths
                return;
            }

            const absDepPath = resolve(depPath, context);

            if (!absDepPath) {
                // unable to resolve path
                return;
            }

            const getTopmostModule = (path) => {
                let currentDirname = dirname(path);
                let previousDirname;
                let lastResolved;
                do {
                    if (currentDirname === rootDir) {
                        break;
                    }

                    const resolved = resolve(currentDirname, context)
                    if (resolved) {
                        lastResolved = resolved;
                    }

                    previousDirname = currentDirname;
                    currentDirname = dirname(currentDirname);
                } while(currentDirname !== previousDirname);

                return lastResolved;
            }

            const myTopmostModule = getTopmostModule(myPath);
            const dependencyTopmostModule = getTopmostModule(absDepPath);

            if (myTopmostModule && dependencyTopmostModule && myTopmostModule === dependencyTopmostModule) {
                // Imported and importee share a common module so should be considered internal
                const relativeImportPath = relative(dirname(myPath), absDepPath);

                let recommendedImportPath = (
                    (relativeImportPath.indexOf('.') !== 0 ? `.${sep}` : '') + relativeImportPath
                ).replace(/\/index\.(js|jsx|ts|tsx)$/, '');
                if (extname(depPath) === '') {
                    recommendedImportPath = recommendedImportPath.replace(extname(recommendedImportPath), '');
                }

                context.report({
                    node: sourceNode,
                    message: 'Importing internal module with absolute path',
                    fix: function(fixer) {
                        return fixer.replaceTextRange(sourceNode.range, `"${recommendedImportPath}"`);
                    }
                });
            }
        }

        return moduleVisitor(checkSourceValue, context.options[0]);
    },
};
