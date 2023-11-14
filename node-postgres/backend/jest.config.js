module.exports = {
    testEnvironment: 'node',
    //NOTE: Jest version 27 & greater uses setupFilesAfterEnv instead of setupFiles
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js']
};