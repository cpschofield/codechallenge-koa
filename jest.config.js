module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
