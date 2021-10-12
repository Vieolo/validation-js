module.exports = {
	roots: ['<rootDir>/'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testPathIgnorePatterns: [
		"/node_modules"
	],
	coverageReporters: ["text", 'html'],
	verbose: true,
	/*coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100
		}
	}*/
}