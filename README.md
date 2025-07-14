# Hudl Login Automation in Playwright

A test automation suite meant to do a basic test of the Hudl login flow.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Feel free to reference the `.envExample` file included.

`HUDLEMAIL`

`HUDLPASSWORD`

## Run Locally

Clone the project

```bash
  git clone https://github.com/pnb90/HudlLoginAutomationPlaywright.git
```

Go to the project directory

```bash
  cd HudlLoginAutomationPlaywright
```

Install dependencies

```bash
  npm install
  npx playwright install
```

## Running Tests

To run the Playwright tests, run the following command

For headless test running:

```bash
  npx playwright test
```

For headed/UI test running:

```bash
  npx playwright test --ui
```
