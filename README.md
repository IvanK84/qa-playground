# QA Playground

A playground repository for experimenting with and testing various QA ideas, automation tools, and concepts.

## Framework Folder Structure
```
qa-playground/
├── components/                 # Reusable page components
│   ├── todo/                 # Flow specific components
│   │   ├── main.ts
│   │   └── ...
│   ├── shared/                 # Components shared across the web
│   │   ├── header.ts
│   │   └── footer.ts
│   └── ...
│
├── fixtures/                   # Environment config and custom fixtures
│   └── testBase.ts            
│
├── tests/                      # Test scenarios (.spec.ts)
│   ├── todoMvc.spec.ts
│   └── example.spec.ts
│
├── playwright.config.ts        # Global Playwright config
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
   *(On Linux/CI, use `npx playwright install --with-deps` to include system dependencies).*

## Running Tests

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

- **Run a specific test file:**
  ```bash
  npx playwright test tests/todoMvc.spec.ts
  ```

- **Run on a specific browser:**
  ```bash
  npx playwright test --project=chromium
  ```

- **Debug tests with Playwright Inspector:**
  ```bash
  npx playwright test --debug
  ```

- **View the HTML test report:**
  ```bash
  npx playwright show-report
  ```

## Used resources:
**Playwright Intro** - https://playwright.dev/docs/intro

**VS Code Extension** - https://playwright.dev/docs/getting-started-vscode (especially the video tutorial)

**GutHub Actions** - https://playwright.dev/docs/ci-intro#setting-up-github-actions

