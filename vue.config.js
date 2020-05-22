module.exports = {
    devServer: {
        port: 9999,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:9200',
                ws: true,
                changeOrigin: true,
                pathRewrite: {'^/api': ''}
            },
            '/danmaku': {
                target: 'http://one.test:1207',
                ws: true,
                changeOrigin: true,
                pathRewrite: {'^/danmaku': ''}
            },
        }
    }
};
