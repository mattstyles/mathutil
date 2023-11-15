import path from 'node:path'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

function externals(list: Array<string>) {
  if (list.length === 0) {
    return () => false
  }

  const re = new RegExp(`^(${list.join('|')})($|/)`)
  return (id: string) => re.test(id)
}

// externals('foo')

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      formats: ['cjs', 'es'],
      fileName: '[name]',
    },
    rollupOptions: {
      // external: externals([
      //   ...Object.keys(pkg?.dependencies ?? {}),
      //   ...Object.keys(pkg?.peerDependencies ?? {}),
      // ]),
      output: {
        preserveModules: true,
      },
    },
  },
  plugins: [
    dts({
      // tsconfigPath: './tsconfig.build.json',
      tsconfigPath: './tsconfig.json',
    }),
  ],
})
