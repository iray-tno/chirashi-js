/* eslint strict: 0, import/order: 0, import/no-unresolved: 0 */

'use strict';

require('ts-node').register(require('./tsconfig.json'));
const gatsbyNode = require('./apps/legacy-gatsby/src/gatsbyNode/index');

exports.createPages = gatsbyNode.createPages;
exports.onCreateNode = gatsbyNode.onCreateNode;
