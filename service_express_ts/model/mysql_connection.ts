import * as mysql from 'mysql';
import { Constants } from './../utils/constants';
import { InitDb } from './init_db';

export class MysqlConnectioin {
	/**
	 * 得到与Mysql的连接
	 * @author xwj 2020-07-15
	 */
	static getConnection(): mysql.Connection {
		let params: Object = {
			...Constants.dbParams,
			database: Constants.dbName,
		};
		let mysqlConnection: mysql.Connection = mysql.createConnection(params);
		return mysqlConnection;
	}
	/**
	 * 进行目标sql操作
	 * @author xwj 2020-07-15
	 * @param sql 目标执行sql
	 * @param sqlParams 目标sql相关动态参数集合
	 * @param bakFun 操作结果回调
	 */
	public static query(sql: string, sqlParams: any, bakFun: Function): void {
		let connection: mysql.Connection = this.getConnection();
		connection.query(sql, sqlParams, (err, rows) => {
			connection.destroy();
			bakFun(err, rows)
		});
	}
	/**
	 * 验证库是否存在
	 * 如果不存在则创建
	 * @author xwj 2020-07-15
	 * @param bakFun 回调方法
	 */
	public static validateDb(bakFun: Function): void {
		let sql: string = 'select now();';
		this.query(sql, '', (err: mysql.MysqlError, rows: any) => {
			if (err) {
				if (err.errno === 1049) { // 认为是目标库不存在，所以需要创建或其他初始化相关
					this.createDb(bakFun);
					return;
				}
			}
			// 数据库存在，无需处理
			bakFun();
		});
	}
	/**
	 * 因为验证不存在，而需要进行创建操作
	 * @author xwj 2020-07-15
	 * @param bakFun 创建完成后的回调方法
	 */
	static createDb(bakFun: Function): void {
		InitDb.initDb(bakFun);
	}
}

