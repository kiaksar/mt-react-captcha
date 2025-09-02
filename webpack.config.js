const path = require('path');

module.exports = {
  entry: './src/index.ts', // Ensure entry is index.ts
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js', // Single output file
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'MTCaptcha',
      type: 'umd',
    },
    globalObject: 'this',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
};