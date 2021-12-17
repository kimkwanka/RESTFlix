import { defineConfig, loadEnv } from 'vite';

import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// Since Jest does not support Vite's import.meta out of the box yet
// but only with heavy configuration changes like experimental ESM support, Babel etc.,
// we instead "re-enable" process.env like outlined here:
// https://github.com/vitejs/vite/issues/1149#issuecomment-857686209

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        [`process.env.${key}`]: `"${val}"`,
      };
    },
    {},
  );

  return {
    define: envWithProcessPrefix,
    plugins: [tsconfigPaths(), react()],
  };
});
