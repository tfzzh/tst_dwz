
const model_dwz = require('./../../model/dwz');
const bak_code = require('./../bakcode');
// 随机码
const rc = require('./../../utils/random_code');
const mod = {
	exec: (req, res, next) => {
		let parm = req.allParams;
		// 短链相关处理
		if (parm && parm.t) {
		} else {
			const errData = {
				code: bak_code.param_err.miss_param_link
			};
			res.send(JSON.stringify(errData));
			return;
		}
		let tUrl = decodeURIComponent(parm.t);
		// 默认填充http://
		if (!tUrl.startsWith('http://') && !tUrl.startsWith('https://')) {
			tUrl = 'http://' + tUrl;
		}
		let shortCode = rc.shortCode();
		model_dwz.insert(shortCode, tUrl, (err, data) => {
			let bakData = {
				code: bak_code.ok,
			};
			if (err) {
				bakData.code = bak_code.db_err.base_err;
				bakData.err = {
					errno: err.errno,
					sqlcode: err.code,
					errmsg: err.sqlMessage,
					sqlstate: err.sqlState,
					sql: err.sql,
				};
			} else {
				let host = req.headers.host;
				if (host.endsWith(':80')) {
					host = host.substring(0, host.length - 3);
				}
				data.sHost = 'http://' + host + '/';
				bakData.data = data;
			}
			res.send(JSON.stringify(bakData));
		});
	}
}

module.exports = { exec: mod.exec }
