import Config from 'webpack-config';
import path from 'path';
import HTMLPlugin from 'html-webpack-plugin';

export default new Config().merge({
    entry: [ 'babel-polyfill', path.resolve(__dirname, '..', 'src', 'index.js') ],
    output: { path: path.resolve(__dirname, '..', 'dist') },
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '~/scenes': path.resolve(__dirname, '..', 'src', 'scenes'),
            '~/modules': path.resolve(__dirname, '..', 'src', 'modules'),
            '~/theme': path.resolve(__dirname, '..', 'src', 'theme'),
            '~/interfaces': path.resolve(__dirname, '..', 'src', 'interfaces'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html'),
            inject: 'body'
        })
    ]
});