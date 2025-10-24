import type { GatsbyNode } from 'gatsby';

/**
 * Disable Gatsby's built-in ESLint webpack plugin
 *
 * Gatsby 5.x uses eslint-webpack-plugin@2.x which is incompatible with ESLint 9.
 * Since we already run ESLint separately via `npm run lint`, we don't need it
 * during webpack builds.
 */
const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ getConfig, actions }) => {
    const config = getConfig();

    // Filter out the ESLint plugin
    const filteredPlugins = config.plugins?.filter(
        (plugin: any) => {
            // Remove ESLint webpack plugin
            return plugin?.constructor?.name !== 'ESLintWebpackPlugin';
        },
    );

    actions.replaceWebpackConfig({
        ...config,
        plugins: filteredPlugins,
    });
};

export default onCreateWebpackConfig;
