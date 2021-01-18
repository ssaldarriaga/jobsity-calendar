import babel from 'rollup-plugin-babel';
import clear from 'rollup-plugin-clear';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

const OUTPUT_DIR = './public/js/';

const styledComponentsTransformer = createStyledComponentsTransformer();

const PLUGINS = [
  clear({
    targets: [`${OUTPUT_DIR}esm`, `${OUTPUT_DIR}system`],
    watch: true,
  }),
  nodeResolve({
    jsnext: true,
    browser: true,
    preferBuiltins: false,
  }),
  postcss({
    plugins: [],
  }),
  commonjs({
    include: 'node_modules/**',
  }),
  typescript({
    transformers: [
      () => ({
        before: [styledComponentsTransformer],
      }),
    ],
  }),
  babel({
    exclude: 'node_modules/**',
  }),
];

export { PLUGINS, OUTPUT_DIR };
