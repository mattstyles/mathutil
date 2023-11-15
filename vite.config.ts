import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

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
      tsconfigPath: './tsconfig.json',
    }),
  ],
})
