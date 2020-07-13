let mysql = require("mysql");
// 基础数据库请求参数
let dbParams = {
	host: 'localhost',
	user: 'root',
	password: 'root',
};
// 数据库名
let dbName = 'tst_dwz1';
// 所相关数据表名
let tabName = {
	d_link: '`d_link`',
	d_link_log: '`d_link_log`',
}
// 连接池，暂时无实际效用，之后考虑真正池效果
let pool = mysql.createPool(Object.assign({}, dbParams, { database: dbName }))//数据库连接配置
/**
 * 进行实际的sql操作
 * @author xwj 2020-07-11
 * @param {string} sql 目标执行sql
 * @param {function} bakFun 操作结果回调
 */
function query(sql, sqlParams, bakFun) {
	pool.getConnection(function (err, conn) {
		if (err) {
			if (err.errno === 1049) { // 认为是目标库不存在，所以需要创建或其他初始化相关
				createDb(sql, sqlParams, bakFun);
				return;
			}
			console.error('>model mysql err in connection ... ', err);
			bakFun(err);
		} else {
			toQuery(conn, sql, sqlParams, bakFun);
		}
	})
}//对数据库进行增删改查操作的基础
/**
 * 尝试进行数据库初始化创建操作
 * @author xwj 2020-07-11
 * @param {string} sql 目标执行sql
 * @param {any} sqlParams 目标sql相关动态参数集合
 * @param {function} bakFun 操作结果回调
 */
function createDb(sql, sqlParams, bakFun) {
	console.log('>model mysql createDb [' + dbName + '] >> [' + sql + ']');
	let init = require('./init_db');
	init.initDb(dbName, dbParams, (err) => {
		console.log('>model mysql create db [' + dbName + '] bak ... ');
		if (!err) {
			// 因成功，从新进行请求
			query(sql, sqlParams, bakFun);
		} else {
			// 失败直接返回
			console.error('>model mysql err in create db ... ', err);
			bakFun(err);
		}
	});
}
/**
 * 进行实际的数据库交互操作
 * @author xwj 2020-07-11
 * @param {connection} conn 相关数据库连接
 * @param {string} sql 目标执行sql
 * @param {any} sqlParams 目标sql相关动态参数集合
 * @param {function} bakFun 操作结果回调
 */
function toQuery(conn, sql, sqlParams, bakFun) {
	console.log('>model mysql to query >> [' + sql + '] [' + JSON.stringify(sqlParams) + ']');
	conn.query(sql, sqlParams, function (err, rows) {
		conn.release();
		bakFun(err, rows)
	})
}

module.exports = {
	query: query,
	tabName: tabName,
}


