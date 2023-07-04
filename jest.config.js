module.exports = {
    "preset": "ts-jest",
    "setupFilesAfterEnv": ["./jest.setup.js"],
    "moduleNameMapper": {
        "^\\@/(.+)": "<rootDir>/src/$1"
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!(next2d|@next2d))"
    ],
    "transform": {
        "\\.jsx?$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testEnvironment": "node"
};
