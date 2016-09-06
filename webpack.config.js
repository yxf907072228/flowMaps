var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'cheap-source-map',
	entry: {
		app: './demos/demo',
		vendor: ['react', 'react-dom']
	},
	output: {
		path: path.join(__dirname, 'demo/static'),
		filename: 'bundle.js',
		publicPath: '/static/'
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
			{
				test: /\.(js|jsx)$/,
				loader: 'babel',
				exclude: /node_modules/
			},
      {
        test: /\.less/,
        loaders: ['style', 'css', 'less'],
        include: __dirname
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },{test: /\.(jpg|png)$/, loader: "url?limit=8192"}
		]
	}
}