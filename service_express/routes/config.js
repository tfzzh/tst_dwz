/**
 * 统一注册路由<br />
 * 自动读取routes中文件夹，并无限向下遍历<br />
 * routes主路径下文件不进行处理，必须有至少一层模块名<br />
 * @author xwj 2020-07-11
 * @param {Express} app 直接通过use进行路由配置
 */
function registRoutes(app) {
	let fs = require('fs'), path = require('path');
	let express = require('express');
	let basePath = './routes';
	/**
	 * 寻找子路由
	 * @param {string} basePath 基础路径
	 * @param {string} name 当前文件名
	 * @param {string} prefixName 有效前缀路径（针对路由部分）
	 */
	function findChildRoute(basePath, prefixName) {
		console.log('>>routes config findChildRoute [' + basePath + '][' + prefixName + '] .. ');
		fs.readdirSync(basePath).forEach(function (name) {
			let fp = path.join(basePath, name);
			// console.log('findChildRoute fp ['+name+'] >> ', fp);
			let sta = fs.statSync(fp);
			if (sta.isDirectory()) {
				// 是文件夹，继续下一步
				findChildRoute(fp, path.join(prefixName, name));
			} else if (sta.isFile()) {
				// 是文件，验证文件类型，如果是js认为是功能注入为功能路由
				if (name.endsWith('.js')) {
					let tName = name.substring(0, name.length - 3);
					let tPath = path.join(prefixName, tName);
					tPath = tPath.replace(/\\/g, '/');
					console.log('>>routes config ready regist route  [' + tPath + ']');
					let reqf = require('.' + tPath);
					if (reqf.exec) {
						app.use(tPath, express.Router().get('/', (req, res, next) => {
							let query = req.query;
							let body = req.body;
							let params = req.params;
							let allParams = {};
							Object.assign(allParams, query, body, params);
							req.allParams = allParams;
							reqf.exec(req, res, next)
						}));
					}
				}
			}
		});
	}
	// 第一层文件遍历，并仅针对文件夹操作
	fs.readdirSync(basePath).forEach(function (name) {
		let fp = path.join(basePath, name);
		let sta = fs.statSync(fp);
		if (sta.isDirectory()) {
			// 是文件夹，继续下一步
			findChildRoute(fp, '/' + name);
		}
	});
}

/**
 * 对外输出
 * @author xwj 2020-07-11
 */
module.exports = {
	regist: registRoutes,
};


