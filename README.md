# MVPAutoAnti

  
# Installation requirements
Clone the repository and install the following requirements in the root folder of the framework.
- npm:
  npm install -g npm
- playwright:
  npm init playwright@latest

# Test Execution
To execute all the test cases run:
USERNAME=<username> PASSWORD=<password> npx playwright test

To execute a specific test case run:
USERNAME=<username> PASSWORD=<password> npx playwright test <testCase.spec.js>

To execute in headed mode (for debugging):
USERNAME=<username> PASSWORD=<password> npx playwright test <testCase.spec.js> --headed
