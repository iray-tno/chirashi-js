const { name } = require('./package.json');

module.exports = {
    pathPrefix: process.env.CI ? `/${name}` : '/',
    siteMetadata: {
        author: 'iray-tno',
        title: 'Chiranoura',
    },
    plugins: [
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
                fileName: 'types/graphql-types.d.ts',
            },
        },
        // 'gatsby-plugin-sharp',
    ],
};
