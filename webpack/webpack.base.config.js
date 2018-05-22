import path from 'path';
import Config from 'webpack-config';
import HTMLPlugin from 'html-webpack-plugin';

export default new Config().merge({
    entry: [ 'babel-polyfill', path.resolve(__dirname, '..', 'src', 'index.js') ],
    output: { path: path.resolve(__dirname, '..', 'build') },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            constants: path.resolve(__dirname, '..', 'src', 'constants'),
            modules: path.resolve(__dirname, '..', 'src', 'modules'),
            components: path.resolve(__dirname, '..', 'src', 'components'),
            scenes: path.resolve(__dirname, '..', 'src', 'scenes'),
            types: path.resolve(__dirname, '..', 'src', 'types'),
            constants: path.resolve(__dirname, '..', 'src', 'constants'),
            api: path.resolve(__dirname, '..', 'src', 'api'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
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