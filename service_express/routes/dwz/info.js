
const model_dwz = require('./../../model/dwz');
const bak_code = require('./../bakcode');
const mod = {
	exec: (req, res, next) => {
		let parm = req.allParams;
		if (parm && parm.d) {
		} else {
			const errData = {
				code: bak_code.param_err.miss_param_d_link
			};
			res.send(JSON.stringify(errData));
			return;
		}
		model_dwz.info(parm.d, '', (err, data) => {
			let bakData = {
				code: bak_code.ok,
			};
			if (err) {
				// 之后针对不同的err，进行不同的code处理
				bakData.code = bak_code.db_err.base_err;
				bakData.err = {
					errno: err.errno,
					sqlcode: err.code,
					errmsg: err.sqlMessage,
					sqlstate: err.sqlState,
					sql: err.sql,
				};
			} else {
				if (data) {
					let host = req.headers.host;
					if (host.endsWith(':80')) {
						host = host.substring(0, host.length - 3);
					}
					bakData.data = {
						sCode: data.d_url,
						sHost: 'http://' + host + '/',
						tUrl: data.tar_url
					};
				}
			}
			res.send(JSON.stringify(bakData));
		});

	}
}

module.exports = { exec: mod.exec }
