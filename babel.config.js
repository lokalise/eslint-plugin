module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: 'node 16',
                    useBuiltIns: 'usage',
                    corejs: 3,
                    modules: 'auto',
                },
            ],
        ],
    };
};
