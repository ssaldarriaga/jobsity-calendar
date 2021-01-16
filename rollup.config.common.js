import babel from 'rollup-plugin-babel';
import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const OUTPUT_DIR = './public/js/';

const PLUGINS = [
  clear({
    targets: [`${OUTPUT_DIR}esm`, `${OUTPUT_DIR}system`],
    watch: true,
  }),
  typescript(),
  nodeResolve({
    jsnext: true,
    browser: true,
    preferBuiltins: false,
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      './node_modules/react/index.js': [
        'cloneElement',
        'createElement',
        'PropTypes',
        'Children',
        'Component',
        'createFactory',
        'PureComponent',
        'lazy',
        'Suspense',
        'useState',
        'useEffect',
      ],
      './node_modules/react-dom/index.js': ['findDOMNode'],
      './node_modules/babel-runtime/node_modules/core-js/library/modules/es6.object.to-string.js': ['default'],
      './node_modules/process/browser.js': ['nextTick'],
      './node_modules/events/events.js': ['EventEmitter'],
      './node_modules/react-is/index.js': ['isValidElementType'],
    },
  }),
  babel({
    exclude: 'node_modules/**',
  }),
];

export { PLUGINS, OUTPUT_DIR };
