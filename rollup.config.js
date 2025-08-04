import resolve from '@rollup/plugin-node-resolve';

export default [
  // ES Module build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    external: ['pixi.js', 'pixi-spine'],
    plugins: [
      resolve()
    ]
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'auto'
    },
    external: ['pixi.js', 'pixi-spine'],
    plugins: [
      resolve()
    ]
  }
];