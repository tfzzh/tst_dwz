// 全局常量对象
export class Constants {
	/**
	 * 表名
	 * @author xwj 2020-07-15
	 */
	static tables: Tables = {
		/**
		 * 短链表名
		 * @author xwj 2020-07-15
		 */
		d_link: '`d_link`',
		/**
		 * 短链访问日志表名
		 * @author xwj 2020-07-15
		 */
		d_link_log: '`d_link_log`',
	};
	/**
	 * 数据库名
	 * @author xwj 2020-07-15
	 */
	static dbName: string = 'tst_dwz';
	/**
	 * 基础数据库请求参数
	 * @author xwj 2020-07-15
	 */
	static dbParams: MysqlConnectionInfo = {
		host: 'localhost',
		user: 'root',
		password: 'root',
	};
}

/**
 * mysql连接信息对象
 * @author xwj 2020-07-15
 */
interface MysqlConnectionInfo {
	host: string,
	user: string,
	password: string,
}

/**
 * 相关表名
 * @author xwj 2020-07-15
 */
interface Tables {
	d_link: string,
	d_link_log: string
}