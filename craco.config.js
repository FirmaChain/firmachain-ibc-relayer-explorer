const CracoAlias = require("craco-alias");
const webpack = require("webpack");
const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
        configure: (webpackConfig) => {
            webpackConfig.resolve.fallback = {
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("stream-browserify"),
                assert: require.resolve("assert"),
                http: require.resolve("stream-http"),
                https: require.resolve("https-browserify"),
                os: require.resolve("os-browserify/browser"),
                url: require.resolve("url"),
                buffer: require.resolve("buffer"),
                process: require.resolve("process/browser"),
                fs: false,
            };

            webpackConfig.plugins.push(
                new webpack.ProvidePlugin({
                    process: "process/browser",
                    Buffer: ["buffer", "Buffer"],
                })
            );

            return webpackConfig;
        },
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./",
                tsConfigPath: "./tsconfig.paths.json",
            },
        },
    ],
};
