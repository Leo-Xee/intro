import { defineConfig } from 'vite'
import browserlistToESbuild from 'browserslist-to-esbuild'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

import pkg from './package.json'

const SUPPORT_TARGETS = browserlistToESbuild()

export default defineConfig({
    plugins: [],
    build: {
        outDir: 'dist',
        lib: {
            entry: {
                index: './src/index.ts',
            },
            formats: ['es'],
        },
        rollupOptions: {
            // 외부 의존성과 하위경로를 포함해서 번들 대상에서 제거
            external: [...Object.keys(pkg.dependencies).flatMap((dep) => [dep, new RegExp(`^${dep}/.*`)])],
            output: [
                {
                    format: 'es',
                    dir: 'dist',
                    plugins: [
                        getBabelOutputPlugin({
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: { version: '3.39.0', proposals: true },
                                    },
                                ],
                            ],
                        }),
                    ],
                },
            ],
        },
        target: SUPPORT_TARGETS,
    },
})
