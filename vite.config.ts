import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';
import packageJson from './package.json';
import capitalize from "lodash/capitalize";
import legacy from '@vitejs/plugin-legacy'

export default ({ mode }) => {
  let devEnv = '';
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd());

  console.log('env', env);
  console.log('running with MODE', mode);

  if (mode === 'development' || mode === 'second') {
    devEnv = `
      <script>
        var DEBUG = "${env.VITE_DEBUG}" === 'true';
        var DEBUG_HOST = "${env.VITE_DEBUG_HOST}";
        var DEBUG_PORT = "${env.VITE_DEBUG_MDS_PORT}";
        var DEBUG_UID = "${env.VITE_DEBUG_UID}";
      </script>
    `;

    console.log('devEnv', devEnv);
  }

  return defineConfig({
    base: '',
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11', 'Android >= 9'],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: packageJson.name.split('_').map(capitalize).join(''),
            devEnv,
          },
        },
      }),
    ],
  });
}

