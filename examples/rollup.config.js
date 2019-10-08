
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
// import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'examples/test.js',
  output: {
    file: 'examples/bundle.js',
    format: 'iife',
    sourcemap: false
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    // terser({
    //   sourcemap: true
    // }),
    filesize()
  ]
}
