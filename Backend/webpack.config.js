const path = require('path');
const nodeExternals = require('webpack-node-externals');
 
module.exports = {
  // Define the entry point for your Node.js application
  entry: './src/index.js', // Replace this with your main server file
 
  // Output where Webpack will bundle your Node.js code
  output: {
    path: path.resolve(__dirname, 'dist'), // Folder for output
    filename: 'bundle.js',                 // The output file name
  },
 
  // Indicate that this bundle is for a Node.js environment
  target: 'node',
 
  // Exclude all node_modules from the output bundle
  externals: [nodeExternals()],
 
  // Use source maps for easier debugging (optional)
  devtool: 'source-map',
 
  // Configure module rules
  module: {
    rules: [
      {
        test: /\.js$/,        // For JavaScript files
        exclude: /node_modules/,
        use: 'babel-loader',  // Transpile using Babel
      },
    ],
  },
 
  // Set mode to production or development
  mode: 'production',  // Change to 'development' for debugging
};