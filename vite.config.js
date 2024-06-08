import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        liveReload([
            __dirname + "/app/**/*.*",
        ]),
        viteStaticCopy({
            // include static files that do not require preprocessing.
            targets: [
                {
                    src: path.resolve(__dirname, "src/static/img/*.*"),
                    dest: "./img/"
                }
            ]
        })
    ],
    root: "src",
    base: process.env.APP_ENV === "development" ? "/" : "/public/assets/",
    css: {
        devSourcemap: true
    },
    build: {
        // output dir for production build.
        outDir: "../public/assets",
        assetDir: "assets",
        emptyOutDir: true,

        // emit manifest so PHP can find the hashed files.
        manifest: 'manifest.json',

        sourcemap: true,

        // Choose assets to preprocess.
        rollupOptions: {
            input: {
                theme: path.resolve(__dirname, "src/sass/theme.scss"),
                main: path.resolve(__dirname, "src/ts/app/main.ts")
            },
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/chunk-[name].js',
                assetFileNames: 'css/[name].css'
            }
        }
    },
    // Create aliases for static paths.
    resolve: {
        alias: {
            images: path.resolve(__dirname, 'public/assets/img')
        }
    },
    server: {
        // we need a strict port to match on PHP side.
        // change freely, but update on bootstrap/vite.php to match the same port.
        // tip: choose a different port per project to run them at the same time.
        strictPort: true,
        port: 5173,
    }
});
