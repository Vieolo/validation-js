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
	transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(date_utility|country_data|react_validation|@vieolo))'
    ],
	verbose: true,
	transform: {
		"^.+\\.js?$": "babel-jest", // Adding this line solved the issue
		"^.+\\.ts?$": "ts-jest"
	},
	/*coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100
		}
	}*/
}