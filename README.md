**JEST**

This repo foucses on writting test case using JEST
---

## jest.config.js
Add **jest.config.js** at the root of your project directory & add the following.
```
module.exports = {
  testEnvironment: 'node', // Use the Node.js environment for testing
  verbose: true, // Output verbose test information
  collectCoverage: true, // Enable code coverage reporting
  cover
}
```
**Add test case files**
`
├── tests
│ ├── auth
│ │ └── auth.test.js
│ ├──user
│ │ └── user.test.js
`
