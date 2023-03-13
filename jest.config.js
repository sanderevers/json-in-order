module.exports = {
    roots: ['<rootDir>'],
    testMatch: [
        "**/test/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx)"
    ],
    transform: {
        "^.+\\.(ts|tsx|js)$": "ts-jest"
    },
}
