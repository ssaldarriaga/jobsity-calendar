import replace from 'rollup-plugin-replace';

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
      'process.env.NODE_ENV': JSON.stringify('development'),
      WEATHER_API_KEY: JSON.stringify(process.env.WEATHER_API_KEY),
    }),
    ...PLUGINS,
  ],
});

export default rollupConfig;
