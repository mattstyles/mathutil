
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
// import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'

const babelSettings = {
  presets: [
    [
      '@babel/preset-env', {
        loose: true,
        targets: '> 5%, not dead'
      }
    ]
  ]
}

export default {
  input: 'examples/cast.js',
  output: {
    file: 'examples/bundle.js',
    format: 'iife',
    sourcemap: false,
    name: 'example'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(babelSettings),
    // terser({
    //   sourcemap: true
    // }),
    filesize()
  ]
}
