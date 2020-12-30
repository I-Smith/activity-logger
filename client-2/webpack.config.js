var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.scss']
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.json$/, type: 'javascript/auto', loader: 'json-loader' },
            { test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file-loader?name=[name].[ext]' }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
		// host: '0.0.0.0',
		// port: 80,
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}