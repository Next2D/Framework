module.exports = {
    "preset": "ts-jest",
    "setupFilesAfterEnv": ["./jest.setup.js"],
    "moduleNameMapper": {
        "^\\@/(.+)": "<rootDir>/src/$1"
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!@next2d/player/)"
    ],
    "transform": {
        "node_modules/@next2d/player/.+.(j|t)s?$": "ts-jest"
    },
    "testEnvironment": "node"
};
