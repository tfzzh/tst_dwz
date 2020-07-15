import * as mysql from 'mysql';
import { Constants } from './../utils/constants';

export class InitDb {
	/**
	 * 创建数据库sql
	 * @author xwj 2020-07-15
	 */
	initDbSql: string = "CREATE DATABASE `" + Constants.dbName + "` DEFAULT CHARACTER SET utf8mb4;";
	/**
	 * 创建表sql集合
	 * @author xwj 2020-07-15
	 */
	initTableSql: object = {
		// 创建表d_link的sql
		d_link: "CREATE TABLE " + Constants.tables.d_link + " (`id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID', `d_url` varchar(8) NOT NULL COMMENT '短网址', `tar_url` varchar(4096) DEFAULT NULL COMMENT '原网址', `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间', `call_times` varchar(45) DEFAULT NULL COMMENT '被调用次数', `last_call_time` bigint(20) DEFAULT NULL COMMENT '最后一次被访问时间', PRIMARY KEY (`id`), UNIQUE KEY `d_url_UNIQUE` (`d_url`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='短连接信息表';",
		// 创建表d_link_log的sql
		d_link_log: "CREATE TABLE " + Constants.tables.d_link_log + " (`id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID', `d_url` varchar(8) DEFAULT NULL COMMENT '目标短地址', `call_time` bigint(20) DEFAULT NULL COMMENT '访问时间', `ip` varchar(55) DEFAULT NULL COMMENT '访问ip', PRIMARY KEY (`id`), KEY `d_url_ind` (`d_url`), KEY `ctime_ind` (`call_time`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='短连接访问日志';",
	};
	/**
	 * 得到与Mysql的连接
	 * @author xwj 2020-07-15
	 */
	getConnection(): mysql.Connection {
		let params: Object = {
			...Constants.dbParams,
			database: Constants.dbName,
		};
		let mysqlConnection: mysql.Connection = mysql.createConnection(params);
		return mysqlConnection;
	}
	/**
	 * 创建库
	 * @param bakFun 创建完成后的回调方法
	 */
	createDb(bakFun: Function) {
		console.log(" ready create db [" + Constants.dbName + "] ... ");
		let conn: mysql.Connection = mysql.createConnection(Constants.dbParams);
		conn.connect((err) => {
			if (!err) {
				conn.query(this.initDbSql, (err) => {
					if (err) {
						bakFun(err);
					} else {
						this.createTables(bakFun);
					}
				});
			} else {
				bakFun(err);
			}
		});
	}
	/**
	 * 创建表
	 * @param bakFun 创建完成后的回调方法
	 */
	createTables(bakFun: Function) {
		let params: Object = {
			...Constants.dbParams,
			database: Constants.dbName,
		};
		let conn: mysql.Connection = mysql.createConnection(params);
		conn.connect((err) => {
			if (!err) {
				let result: CreateResult = {
					total: 0,
					over: 0,
					error: undefined,
					isErrorBak: false,
				}
				// 逐个遍历并创建
				for (let tableName in this.initTableSql) {
					result.total++;
					console.log('>model init create table [' + tableName + ']');
					conn.query(this.initTableSql[tableName], (err) => {
						if (err) {
							result.error = err;
						}
						this.validateResult(result, bakFun);
					});
				}
			} else {
				bakFun(err);
			}
		});
	}
	/**
	 * 验证结果
	 * @author xwj 2020-07-15
	 * @param result 过程结果
	 * @param bakFun 创建完成后的回调方法
	 */
	validateResult(result: CreateResult, bakFun: Function) {
		result.over++;
		if (result.error) {
			if (!result.isErrorBak) {
				// 因有问题而回调，并保证只回调一次
				result.isErrorBak = true;
				bakFun(result.error);
				return;
			}
		}
		if (result.over === result.total) {
			// 达成操作数量
			if (!result.error) {
				bakFun();
			}// 因为存在问题情况，所以之前已经回传过
		}
	}

	/**
	 * 初始化数据库操作
	 * @author xwj 2020-07-15
	 * @param bakFun 创建完成后的回调方法
	 */
	public static initDb(bakFun: Function) {
		let initdb: InitDb = new InitDb();
		initdb.createDb(bakFun);
	}
}
/**
 * 创建结果记录
 * @author xwj 2020-07-15
 */
interface CreateResult {
	/** 
	 * 待创建表总量
	 * @author xwj 2020-07-15
	 */
	total: number,
	/**
	 * 当前完成数量
	 * @author xwj 2020-07-15
	 */
	over: number,
	/**
	 * 存在问题时的问题详情
	 * @author xwj 2020-07-15
	 */
	error: mysql.MysqlError | undefined,
	/**
	 * 是否已经将问题回传
	 * @author xwj 2020-07-15
	 */
	isErrorBak: boolean,
}
