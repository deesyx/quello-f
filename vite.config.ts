import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    server: {
        open: true,
        proxy: {
            // 请求的路径前缀只要是 /testaxios 就会被拦截走这个代理
            "/quello": {
                target: 'http://180.76.229.88:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/quello/, ''),
            },
        },
    }
});
