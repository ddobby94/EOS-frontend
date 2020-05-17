module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.js$': "babel-jest",
        '^.+\\.tsx?$': 'ts-jest'
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
         "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
    }
}