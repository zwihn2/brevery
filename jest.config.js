module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.js',
        '!<rootDir>/src/**/__test__/__snapshots__/**',
        '!<rootDir>/src/**/__mocks__/**',
    ],
    coverageThreshold: {
        global: {
            statements: 80.00,
            branches: 80.00,
            functions: 80.00,
            lines: 80.00,
        },
    },
    modulePathIgnorePatterns: ['public'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    testURL: 'http://localhost/',
    transform: { '.js': 'babel-jest' },
    testResultsProcessor: 'jest-sonar-reporter',
    verbose: false,
};
