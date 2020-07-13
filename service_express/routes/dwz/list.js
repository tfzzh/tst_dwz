
const model_dwz = require('./../../model/dwz');
const bak_code = require('./../bakcode');
const mod = {
	exec: (req, res, next) => {
		let parm = req.allParams;
		// 分页参数相关
		let page = 1;
		let size = 20;
		if (parm && parm.s) {
			let ps = parseInt(parm.s, 10);
			if (ps === NaN) {
			} else if (ps < 5) {
				size = 5;
			} else if (ps > 100) {
				size = 100;
			} else {
				size = ps;
			}
		}
		if (parm && parm.p) {
			let pp = parseInt(parm.p, 10);
			if (pp === NaN) {
			} else if (pp < 2) {
			} else {
				page = pp;
			}
		}
		model_dwz.list(page, size, (err, data) => {
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
				bakData.data = data;
			}
			res.send(JSON.stringify(bakData));
		});
	}
}

module.exports = { exec: mod.exec }
