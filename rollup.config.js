
import buble from 'rollup-plugin-buble'

let pkg = require('./package.json')

export default {
  entry: 'src/index.js',
  plugins: [
    buble({
      transforms: {
        generator: false,
        modules: false
      }
    })
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: pkg.name,
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      moduleName: pkg.name,
      sourceMap: true
    }
  ]
}
