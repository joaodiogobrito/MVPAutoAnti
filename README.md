# MVPAutoAnti

  
# Installation requirements
Clone the repository and install the following requirements.
- npm:<br />
  npm install -g npm
- playwright:<br />
  npm init playwright@latest

# Test Execution
To execute all the test cases run:<br />
USERNAME=username PASSWORD=password npx playwright test<br />

To execute a specific test case run:<br />
USERNAME=username PASSWORD=password npx playwright test testCase.spec.js<br />

To execute in headed mode (for debugging):<br />
USERNAME=username PASSWORD=password npx playwright test testCase.spec.js --headed<br />
