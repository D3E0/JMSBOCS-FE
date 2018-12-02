module.exports = {
    devServer: {
        port: 8888,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true
            },
        }
    }
};