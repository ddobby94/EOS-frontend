module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.js$': "babel-jest",
        '^.+\\.tsx?$': 'ts-jest',
        ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|js|jsx|ts)?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: [
        "raf/polyfill",
        "./tools/enzymeTestAdapterSetup.js"
    ],
    transformIgnorePatterns: [
        "/node_modules/",
        "^.+\\.module\\.(css|sass|scss)$"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
        "^.+\\.module\\.(css|sass|scss)$": "babel-jest"
    }
}