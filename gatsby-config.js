const { config } = require('dotenv');
const { name } = require('./package.json');

// Read .env file
const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development';
config({ path: `.env.${activeEnv}` });

module.exports = {
    pathPrefix: process.env.CI ? `/${name}` : '/',
    siteMetadata: {
        author: 'iray-tno',
        title: 'Chiranoura',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: process.env.GA_TRACKING_ID,
                head: false,
                pageTransitionDelay: 10,
                defer: true,
            },
        },
        {
            resolve: 'gatsby-plugin-sharp',
        },
        {
            resolve: 'gatsby-plugin-react-css-modules',
            options: {
                generateScopedName: '[path]___[name]__[local]', // FIXME#157: Cannot use hashes.
                filetypes: {
                    '.scss': {
                        syntax: 'postcss-scss',
                    },
                },
                exclude: '/global/',
            },
        },
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                cssLoaderOptions: {
                    localIdentName: '[path]___[name]__[local]', // FIXME#157: Cannot use hashes.
                },
            },
        },
        'gatsby-plugin-catch-links',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/articles`,
                name: 'blog',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-component',
                    },
                    {
                        resolve: 'gatsby-remark-prismjs',
                        options: {
                            showLineNumbers: true,
                            noInlineHighlight: true,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-autolink-headers',
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            linkImagesToOriginal: false,
                        },
                    },
                ],
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-plugin-graphql-codegen',
            options: {
                fileName: 'types/graphqlTypes.d.ts',
            },
        },
    ],
};
