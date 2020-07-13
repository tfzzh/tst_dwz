let mysql = require("mysql");
let mysql_conn = require("./mysql_conn");
/**
 * 数据库初始化相关内容
 * 之后需要考虑增加版本相关处理
 * @author xwj 2020-07-11
 */
let init_sql = {
	// 创建库的sql
	db_sql: 'CREATE DATABASE `{dbName}` DEFAULT CHARACTER SET utf8mb4;',
	dbReg: new RegExp('{dbName}', 'g'), // 之后可以考虑使用统一文件处理
	// 创建表相关sql
	table_sql: {
		d_link: "CREATE TABLE " + mysql_conn.tabName.d_link + " (`id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID', `d_url` varchar(8) NOT NULL COMMENT '短网址', `tar_url` varchar(4096) DEFAULT NULL COMMENT '原网址', `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间', `call_times` varchar(45) DEFAULT NULL COMMENT '被调用次数', `last_call_time` bigint(20) DEFAULT NULL COMMENT '最后一次被访问时间', PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`), UNIQUE KEY `d_url_UNIQUE` (`d_url`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='短连接信息表';",
		d_link_log: "CREATE TABLE " + mysql_conn.tabName.d_link_log + " (`id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID', `d_url` varchar(8) DEFAULT NULL COMMENT '目标短地址', `call_time` bigint(20) DEFAULT NULL COMMENT '访问时间', `ip` varchar(55) DEFAULT NULL COMMENT '访问ip', PRIMARY KEY (`id`), KEY `d_url_ind` (`d_url`), KEY `ctime_ind` (`call_time`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='短连接访问日志';",
	},
	/**
	 * 数据库初始化
	 * @author xwj 2020-07-11
	 * @param {string} dbName 目标数据库名
	 * @param {any} dbParams 数据库连接相关参数
	 * @param {function} bakFun 操作结果回调
	 */
	db: (dbName, dbParams, bakFun) => {
		console.log('>model init ready db [' + dbName + ']');
		let conn = mysql.createConnection(dbParams);
		conn.connect((err) => {
			if (!err) {
				let dbSql = init_sql.db_sql.replace(init_sql.dbReg, dbName);
				console.log('>model init create db [' + dbSql + ']');
				conn.query(dbSql, (err) => {
					bakFun(err);
				});
			} else {
				bakFun(err);
			}
		});
	},
	/**
	 * 结构表初始化
	 * @author xwj 2020-07-11
	* @param {any} dbParams 数据库连接相关参数
	* @param {function} bakFun 操作结果回调
	 */
	table: (dbParams, bakFun) => {
		console.log('>model init ready table');
		let conn = mysql.createConnection(dbParams);
		conn.connect((err) => {
			if (!err) {
				let coun = {
					tot: 0, // 总量
					ove: 0, // 完成量
					err: undefined, // 暂时为单一，之后处理为可以列表
				}
				function tabBak(err) {
					if (err) {
						coun.err = err;
					}
					coun.ove++;
					if (coun.ove === coun.tot) {
						// 已完成，进行下一步
						bakFun(coun.err);
					}
				}
				for (let tn in init_sql.table_sql) {
					coun.tot++;
					console.log('>model init create table [' + tn + ']');
					conn.query(init_sql.table_sql[tn], (err) => {
						tabBak(err);
					});
				}
			} else {
				bakFun(err);
			}
		});
	},
};

module.exports = {
	/**
	 * 数据库与表初始化
	 * @author xwj 2020-07-11
	 * @param {string} dbName 目标数据库名
	 * @param {any} dbParams 数据库连接相关参数
	 * @param {function} bakFun 操作结果回调
	 */
	initDb: (dbName, dbParams, bakFun) => {
		init_sql.db(dbName, dbParams, (err) => {
			if (err) {
				bakFun(err);
			} else {
				init_sql.table(Object.assign({}, dbParams, { database: dbName }), bakFun);
			}
		});
	},
	/**
	 * 数据表初始化
	 * @author xwj 2020-07-11
	 * @param {any} dbParams 数据库连接相关参数
	 * @param {function} bakFun 操作结果回调
	 */
	initTable: (dbParams, bakFun) => {
		init_sql.table(dbParams, bakFun);
	}
}