import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    client: '@hey-api/client-axios',
    base: 'http://127.0.0.1:8001',
    input: 'http://127.0.0.1:8001/openapi.json',
    output: 'src/client',
    plugins: [
        ...defaultPlugins,
    ]
});