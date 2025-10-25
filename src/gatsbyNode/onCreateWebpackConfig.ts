import type { GatsbyNode } from 'gatsby';

/**
 * Disable ESLint in Gatsby webpack builds
 *
 * We run ESLint separately via `npm run lint` with our own ESLint 9 flat config.
 * Gatsby's eslint-webpack-plugin tries to use the incompatible eslint-config-react-app
 * which conflicts with ESLint 9. Removing the plugin avoids the conflict and improves
 * build performance.
 */
const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ getConfig, actions }) => {
    const config = getConfig();

    // Remove ESLint plugin from webpack configuration
    if (config.plugins) {
        config.plugins = config.plugins.filter(
            (plugin: any) => plugin?.constructor?.name !== 'ESLintWebpackPlugin',
        );

        actions.replaceWebpackConfig(config);
    }
};

export default onCreateWebpackConfig;
