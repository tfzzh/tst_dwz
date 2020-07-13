const mysql_conn = require('./mysql_conn');
const db = {
	sql: {
		// 短链列表
		list: "select * from " + mysql_conn.tabName.d_link + " order by id desc limit {sInd}, {pageSize}",
		// 短链总量
		listCount: "select count(0) as tot from " + mysql_conn.tabName.d_link,
		// 新增短链
		insertInfo: "insert into " + mysql_conn.tabName.d_link + " (d_url, tar_url, create_time, call_times, last_call_time) values (?,?,?,?,?);", // '{dUrl}', '{tarUrl}', {cTime}, 0, 0
		// 目标短链
		info: "select * from " + mysql_conn.tabName.d_link + " where d_url=?;", // '{dUrl}'
		// 变更短链被访问信息
		upInfo: "update " + mysql_conn.tabName.d_link + " set call_times = call_times + 1, last_call_time = ? where d_url = ?;",
		// 新增日志
		insertLog: "insert into " + mysql_conn.tabName.d_link_log + " (d_url, call_time, ip) values (?,?,?);", // '{dUrl}', {cTime}, '{ip}'
		// 目标短链日志列表
		logList: "select * from " + mysql_conn.tabName.d_link_log + " where d_url=? order by id desc limit {sInd}, {pageSize}", // '{dUrl}'
	},
	reg: {
		// dUrlReg: new RegExp('{dUrl}', 'g'),
		// tarUrlReg: new RegExp('{tarUrl}', 'g'),
		// cTimeReg: new RegExp('{cTime}', 'g'),
		// ipReg: new RegExp('{ip}', 'g'),
		sIndReg: new RegExp('{sInd}', 'g'),
		pageSizeReg: new RegExp('{pageSize}', 'g'),
	},
	iface: {
		/**
		 * 链接列表
		 * @param {int} p 目标页
		 * @param {int} s 页数据量
		 * @param {function} bakFun 回调方法
		 */
		list: (p, s, bakFun) => {
			let sInd = (p - 1) * s;
			let sql = db.sql.list.replace(db.reg.sIndReg, sInd);
			sql = sql.replace(db.reg.pageSizeReg, s);
			mysql_conn.query(sql, '', (err, datas) => {
				if (err) {
					bakFun(err);
					return;
				}
				mysql_conn.query(db.sql.listCount, '', (err2, data2) => {
					if (err2) {
						bakFun(err2);
						return;
					}
					let tot = 0;
					if (data2 && data2.length) {
						tot = data2[0].tot;
					}
					bakFun(err, { list: datas, total: tot });
				});
			});
		},
		/**
		 * 新增短链接
		 * @param {string} dUrl 短code
		 * @param {string} tarUrl 目标地址
		 * @param {function} bakFun 回调方法
		 */
		insert: (dUrl, tarUrl, bakFun) => {
			let sql = db.sql.insertInfo;
			mysql_conn.query(sql, [dUrl, tarUrl, new Date().getTime(), 0, 0], (err, data) => {
				if (err) {
					bakFun(err);
				} else {
					let newId = data.insertId;
					console.assert(newId, '>model dwz insert short_link ['+dUrl+']['+newId+'] ...');
					bakFun(err, { id: newId, sCode: dUrl });
				}
			});
		},
		/**
		 * 指定短链信息
		 * @param {string} dUrl 短code
		 * @param {string} ip 访问ip，认为需要同时记录log
		 * @param {function} bakFun
		 */
		info: (dUrl, ip, bakFun) => {
			// 首先获取目标数据
			let sql = db.sql.info;
			mysql_conn.query(sql, dUrl, (err, data) => {
				if (err) {
					bakFun(err);
				} else {
					console.assert(ip, '>model dwz info need ['+dUrl+']['+ip+'] to log ... ');
					if (ip) {
						// 认为是需要记录log的情况
						db.methods.insertLog(dUrl, ip, (lerr) => {
							// 记录日志无判定
						});
						// 更新访问情况数据
						db.methods.upInfo(dUrl, (uerr) => {
							// 更新后无判定
						});
					}
					if (data && data.length) {
						bakFun(err, data[0]);
					} else {
						bakFun(err);
					}
				}
			});
		},
	},
	methods: {
		/**
		 * 新增短链访问日志
		 * @param {string} dUrl 短code
		 * @param {string} ip 访问ip
		 * @param {function} bakFun
		 */
		upInfo: (dUrl, bakFun) => {
			let sql = db.sql.upInfo;
			mysql_conn.query(sql, [new Date().getTime(), dUrl], (err, data) => {
				bakFun(err, data);
			});
		},
		/**
		 * 新增短链访问日志
		 * @param {string} dUrl 短code
		 * @param {string} ip 访问ip
		 * @param {function} bakFun
		 */
		insertLog: (dUrl, ip, bakFun) => {
			let sql = db.sql.insertLog;
			mysql_conn.query(sql, [dUrl, new Date().getTime(), ip], (err, data) => {
				if (err) {
					bakFun(err);
				} else {
					bakFun(err, data);
				}
			});
		},
	}
}

module.exports = db.iface;
