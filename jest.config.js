const { defaults } = require('jest-config');

module.exports = {
    verbose: true,
    testPathIgnorePatterns: [
        ...defaults.testPathIgnorePatterns,
        '/.cache/',
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
};
