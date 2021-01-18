const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
	mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.scss']
	},
	entry: './src/index.jsx',
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'dist'),
	},
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: '/node-modules/'},
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.json$/, type: 'javascript/auto', loader: 'json-loader' },
			{ test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file-loader?name=[name].[ext]' }
            // { test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file-loader', options: { name: '[path][name].[ext]' } }
        ]
    },
    plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: './public/', to: 'public' },
			],
		}),
		new HtmlWebpackPlugin({
        	template: './src/index.html'
		}),
	],
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://api.isaacsmith.tk',
        })
    }
//     mode: 'production',
//     resolve: {
// 		modules: [
// 			'node_modules',
// 		],
//         extensions: ['.js', '.jsx', '.json', '.css', '.scss']
//     },
// 	output: {
// 		filename: '[name].js',
// 		path: resolve(__dirname, 'dist'),
// 	},

// 	context: resolve(__dirname, 'src'),
	
//     module: {
//         rules: [
//             { test: /\.jsx?$/, use: 'babel-loader' },
//             { test: /\.css$/, use: ['style-loader', 'css-loader'] },
//             { test: /\.json$/, type: 'javascript/auto', loader: 'json-loader' },
//             { test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file-loader?name=[name].[ext]' }
//         ]
// 	},
// 	plugins: [
// 		new CopyWebpackPlugin({
// 			patterns: [
// 				{ from: '../public', to: 'public' },
// 			],
// 		}),
// 		new webpack.LoaderOptionsPlugin({
// 			minimize: true,
// 		}),
// 	],
//     externals: {
//         // global app config object
//         config: JSON.stringify({
//             apiUrl: 'http://localhost:4000'
//         })
//     }
}