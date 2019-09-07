# Lyte REST API test client
> small Mobx/React client of [api.my-events.site](http://api.my-events.site/api/)

[![Build Status](https://api.travis-ci.com/ekokotov/lyte-test-app.svg?branch=master)](https://travis-ci.com/ekokotov/lyte-test-app)

## Scripts

```bash
# start the app with webpack dev server
npm start

# build app to ./dist folder and copy favicon with manifest
npm run build

# build app to ./dist folder and copy favicon with manifest + overwrite  .js/.css sources with GZIPed versions. 
npm run build-gzip

# build app to ./dist folder and serve it. 
npm run run-static-prod
```
### Views
- Sign up
- Sign in
- Event list (default view)
- Event details
- Edit event (**private route and it requires authentication!**)

## Dependencies
- React@16 with React-dom@6
- Mobx@5 with Mobx-react@5
- react-router-dom@5 (for routing) / BTW please check my other branch with [mobx-router](https://github.com/ekokotov/lyte-test-app/tree/mobx-router).
- react-paginate@6 (for events pagination)
- classnames@2 (conditional styles and classes)
- date-fns@2 (format date and time, modular alternative to moment.js)
- lodash@4 (utils)
- dompurify@1 (to sanitize html in event description)
- [bulma@0.7](https://bulma.io/) (CSS-SASS framework based on flex-box). BTWm components has some own locally scoped styles wrapped with [CSS-Modules](https://github.com/css-modules/css-modules)

## Build system
- webpack@4 + plugins
- babel
