const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	// 针对本机测试环境配置
	app.use(createProxyMiddleware('/api', {
		target: 'http://127.0.0.1:8011',
		secure: false,
		changeOrigin: true,
		pathRewrite: { // 与数据请求配置：
			"^/api": "/"
		},
	}));
};