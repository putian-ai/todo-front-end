import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    base: 'http://127.0.0.1:8000',
    input: 'http://127.0.0.1:8000/openapi.json',
    output: 'src/client',
});