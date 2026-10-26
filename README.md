# QA Playground

A playground repository for experimenting with and testing various QA ideas, automation tools, and concepts.

## Test Scope

- **UI Tests**: End-to-end browser tests against TodoMVC using Component / Page Object patterns and custom fixtures.
- **API Tests**: Headless HTTP REST API testing against [Restful-booker](https://restful-booker.herokuapp.com/) demonstrating Playwright `APIRequestContext`, reusable API clients, automatic auth token handling, and teardown fixtures.

## Framework Folder Structure

```
qa-playground/
├── api/                        # API clients and test data helpers
│   ├── bookingClient.ts
│   └── testData.ts
├── components/                 # Reusable page components (UI)
│   ├── todo/                   # Flow specific components
│   │   ├── main.ts
│   │   └── ...
│   ├── shared/                 # Components shared across pages
│   │   ├── header.ts
│   │   └── footer.ts
│   └── ...
│
├── fixtures/                   # Environment config and custom fixtures
│   ├── testBase.ts             # UI fixtures (component injection, navigation)
│   └── apiBase.ts              # API fixtures (clients, auth token, data teardown)
│
├── tests/                      # Test scenarios (.spec.ts)
│   ├── api/                    # API test suites
│   │   └── booking.spec.ts
│   ├── todoMvc.spec.ts         # UI test suites
│   └── example.spec.ts
│
├── playwright.config.ts        # Global Playwright config (projects for UI & API)
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

### Setup

1. **Install Node dependencies:**

   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```
   _(On Linux/CI, use `npx playwright install --with-deps` to include system dependencies)._

## Running Tests

### General

- **Run all tests (headless):**

  ```bash
  npm test
  # or
  npx playwright test
  ```

- **Run in interactive UI Mode:**

  ```bash
  npx playwright test --ui
  ```

- **Run in headed mode (visible browser):**

  ```bash
  npx playwright test --headed
  ```

- **Debug tests with Playwright Inspector:**

  ```bash
  npx playwright test --debug
  ```

- **View the HTML test report:**

  ```bash
  npx playwright show-report
  ```

### UI Tests

- **Run UI tests only:**

  ```bash
  npx playwright test --project=chromium
  ```

- **Run a specific UI test file:**

  ```bash
  npx playwright test tests/todoMvc.spec.ts
  ```

### API Tests

- **Run API tests only (project):**

  ```bash
  npx playwright test --project=api
  ```

- **Run API tests by tag:**

  ```bash
  npx playwright test --grep "@api"
  ```

- **Run a specific API test file:**

  ```bash
  npx playwright test tests/api/booking.spec.ts
  ```

## Used resources:

**Playwright Intro** - https://playwright.dev/docs/intro

**Playwright API Testing** - https://playwright.dev/docs/api-testing

**Restful-booker API Playground** - https://restful-booker.herokuapp.com/

**VS Code Extension** - https://playwright.dev/docs/getting-started-vscode (especially the video tutorial)

**GitHub Actions** - https://playwright.dev/docs/ci-intro#setting-up-github-actions
