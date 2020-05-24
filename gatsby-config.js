const { name } = require('./package.json');

module.exports = {
    pathPrefix: process.env.CI ? `/${name}` : '/',
    siteMetadata: {
        author: 'iray-tno',
        title: 'Chiranoura',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-react-css-modules',
            options: {
                generateScopedName: '[path]___[name]__[local]___[hash:base64:5]',
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
                    localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
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
            // options: {
            //     plugins: [
            //         {
            //             resolve: 'gatsby-remark-images',
            //             options: {
            //                 linkImagesToOriginal: false,
            //             },
            //         },
            //     ],
            // },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-plugin-graphql-codegen',
            options: {
                fileName: 'types/graphqlTypes.d.ts',
            },
        },
        // 'gatsby-plugin-sharp',
    ],
};
