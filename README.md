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
```
├── tests
│ ├── auth
│ │ └── auth.test.js
│ ├──user
│ │ └── user.test.js
```

**Run the following to get test result**
```
npx jest
```
**Will get response as follows**
```
POST /api/auth/signin 200 1080.421 ms - 390
POST /api/auth/signin 200 1042.576 ms - 390
GET /api/user/all 403 1.900 ms - 47
POST /api/auth/signin 401 35.671 ms - 54
GET /api/user/all 200 72.642 ms - 369
 PASS  tests/user/user.test.js
  User API
    GET /api/user/all without Bearer Token
      √ should return 403 unauthorized (19 ms)
    GET /api/user/all with Bearer Token
      √ should return a list of users (77 ms)

POST /api/auth/signin 401 104.854 ms - 54
 PASS  tests/auth/auth.test.js
  POST /api/auth/signin
    √ Testing with proper credential (1070 ms)
    √ Testing with wrong username  (41 ms)
    √ Testing with wrong password  (111 ms)

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        3.553 s, estimated 4 s
Ran all test suites.
```
