import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/module.js',
  output: {
    file: 'dist/module.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]
};
