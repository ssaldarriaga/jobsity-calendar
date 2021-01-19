import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import { PLUGINS, OUTPUT_DIR } from './rollup.config.common';

const rollupConfig = () => ({
  input: ['./src/index.tsx'],
  output: [
    {
      dir: `${OUTPUT_DIR}system/`,
      format: 'system',
    },
    {
      dir: `${OUTPUT_DIR}esm/`,
      format: 'esm',
    },
  ],
  watch: {
    include: ['./src/**'],
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      WEATHER_API_KEY: JSON.stringify(process.env.WEATHER_API_KEY),
    }),
    ...PLUGINS,
    terser({
      compress: {
        unused: false,
        collapse_vars: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
});

export default rollupConfig;
