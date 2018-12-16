# vuetify-project-template

Installation:

1. In config folder:
  1.1. Copy `.env.template` to `.env`
  1.2. Replace template data within that file
2. Run `npm ci` if npm v5.7 or higher is installed. Use `npm install` otherwise (might cause dependency version conflicts)

## Build Setup

``` bash
# install dependencies (npm v5.7 or higher)
npm ci

# install dependencies (npm v5.6 or lower)
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# run eslint
npm run lint

# run unit tests
npm run unit:test
```

## Server configuration (necessary to use built in browser navigation tools)

```
# nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

For other server configurations visit [vue-router docs](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations).

Other useful links for working with this template:  
[vue docs](https://vuejs.org/)  
[vuetify docs](https://vuetifyjs.com/)  
[vue cli docs](https://cli.vuejs.org/)  
[material icons](https://material.io/tools/icons/)
