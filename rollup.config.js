
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'

import pkg from './package.json'

const umd = {
  name: 'Mathutil',
  file: 'dist/mathutil.min.js'
}

export default [
  // umd
  {
    input: 'src/index.js',
    external: [
      ...Object.keys(pkg.dependencies)
    ],
    output: {
      name: umd.name,
      file: umd.file,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      babel(),
      terser({
        sourcemap: true
      }),
      filesize()
    ]
  },
  // cjs/es
  {
    input: 'src/index.js',
    external: [
      ...Object.keys(pkg.dependencies)
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      babel(),
      filesize()
    ]
  }
]
