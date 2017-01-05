
import buble from 'rollup-plugin-buble'

export default {
  entry: 'examples/turn.js',
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
      dest: 'examples/bundle.js',
      format: 'umd',
      moduleName: 'bundle.js',
      sourceMap: false
    }
  ]
}
