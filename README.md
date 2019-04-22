# Brewery app

### What's Included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations.  You'll see something like this:

```
application-APPNAME/
├── conf/
└── src/
    ├── actions/
    ├── app/
    │   ├── /conf.js
    │   └── /index.js
    ├── clients/
    ├── components/
    ├── constants/
    ├── helpers/
    ├── reducers/
    ├── sagas/
    ├── selectors/
    ├── services/
    ├── styles/
    ├── index.development.html
    └── index.production.html
```

### Build Tasks

| Task | Command |
| ---- | ------- |
| `npm run start:dev` | Sources the dev environment, compiles the SCSS and JS, runs the server and displays the site. |
| `npm run start:qa` | Sources the qa environment, compiles the SCSS and JS, runs the server and displays the site. |
| `npm run lint` | Runs ESLint for JS files. |
| `npm test` | Runs the Jest CLI test suite. |
| `npm run test:changed` | Runs the test suite on only changed files. |
| `npm run test:update` | Runs the test suite and update snapshots. |
| `npm run flow` | Runs flow type checking. |
| `npm run audit` | Audits the CSS and creates reports |
| `npm run demo` | Task for demo branch. Compiles files in production mode and copy config file which will be filled with demo jenkins job. |
| `npm run dist` | Compiles the (S)CSS and JS, minifies all assets, adds a header to each file, runs the linter, test suite and audit.  |

