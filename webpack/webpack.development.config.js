import webpack from 'webpack';
import path from 'path';
import Config from 'webpack-config';

export default new Config().extend('webpack/webpack.base.config.js').merge({
    mode: 'development',
    entry: [ 'react-hot-loader/patch' ],
    output: { filename: 'bundle.js' },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '..', 'build'),
        host: 'localhost',
        port: 1000,
        proxy: {
            '/api': {
                target: 'http://cp.gpuserver.ru',
                rewritePath: { '^/api': '' }
            }
        },
        historyApiFallback: true,
        hot: true,
        inline: true,
        noInfo: true,
        progress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        })
    ]
});