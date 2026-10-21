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
│   └── test-base.ts            
│
├── tests/                      # Test scenarios (.spec.ts)
│   ├── todoMvc.spec.ts
│   └── example.spec.ts
│
├── playwright.config.ts        # Global Playwright config
└── package.json
```

## Used resources:
**Playwright Intro** - https://playwright.dev/docs/intro

**VS Code Extension** - https://playwright.dev/docs/getting-started-vscode (especially the video tutorial)

**GutHub Actions** - https://playwright.dev/docs/ci-intro#setting-up-github-actions

