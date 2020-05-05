/* eslint strict: 0, import/order: 0, import/no-unresolved: 0 */

'use strict';

require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'esnext',
    },
});
const gatsbyNode = require('./src/gatsbyNode/index');

exports.createPages = gatsbyNode.createPages;
exports.onCreateNode = gatsbyNode.onCreateNode;
