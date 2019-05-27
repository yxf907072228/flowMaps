var path = require('path')
var webpack = require('webpack')
var path = require('path')
module.exports = {
	devtool: 'eval',
	entry: {
		app: './app',
		vendor: ['react', 'react-dom','zrender']
	},
	output: {
		path: path.join(__dirname, 'demo/static'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	resolve:{
		alias:{
			 
		}
	},
	plugins: [
		// ignore dev config
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

		// set global vars
		new webpack.DefinePlugin({
			'process.env': {
				// Useful to reduce the size of client-side libraries, e.g. react
				NODE_ENV: JSON.stringify('production')
			}
		}),

		// optimizations
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// })
	],
	module: {
		loaders: [
			{ test: /\.css/, loader: 'style!css' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.(js|jsx)$/, loaders: [ 'babel'], exclude: /node_modules/},
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=100000' }
		]
	}
}