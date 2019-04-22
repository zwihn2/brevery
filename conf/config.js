const window = require('window');

(() => {
    window.__config = window.__config || {};
    window.__config.ROOT_URL = process.env.ROOT_URL;
    window.__config.NODE_ENV = process.env.NODE_ENV;
})(this);