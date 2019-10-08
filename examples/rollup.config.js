
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
// import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'

const bubleOptions = {
  objectAssign: true,
  transforms: {
    generator: false,
    modules: false,
    classes: false
  }
}

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
    buble(bubleOptions),
    // terser({
    //   sourcemap: true
    // }),
    filesize()
  ]
}
