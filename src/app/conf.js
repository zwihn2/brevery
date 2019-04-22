let conf = {};

if (typeof window !== 'undefined' && typeof window.__config !== 'undefined') {
    conf = {
        environment: window.__config.NODE_ENV,
        serverUrl: window.__config.ROOT_URL,
    };
}

export default conf;
