import { MysqlConnectioin as mysql_conn } from './mysql_connection';
import { Constants } from './../utils/constants';

export class ModelDwz {
	/**
	 * 短链列表
	 * @author xwj 2020-07-15
	 */
	sqlList: string = "select * from " + Constants.tables.d_link + " order by id desc limit {sInd}, {pageSize}";
	/**
	 * 短链总量
	 * @author xwj 2020-07-15
	 */
	sqlListCount: string = "select count(0) as tot from " + Constants.tables.d_link;
	/**
	 * 新增短链
	 * @author xwj 2020-07-15
	 */
	sqlInsertInfo: string = "insert into " + Constants.tables.d_link + " (d_url, tar_url, create_time, call_times, last_call_time) values (?,?,?,?,?);";
	/**
	 * 目标短链
	 * @author xwj 2020-07-15
	 */
	sqlInfo: string = "select * from " + Constants.tables.d_link + " where d_url=?;";
	/**
	 * 变更短链被访问信息
	 * @author xwj 2020-07-15
	 */
	sqlUpInfo: string = "update " + Constants.tables.d_link + " set call_times = call_times + 1, last_call_time = ? where d_url = ?;";
	/**
	 * 新增日志
	 * @author xwj 2020-07-15
	 */
	sqlInsertLog: string = "insert into " + Constants.tables.d_link_log + " (d_url, call_time, ip) values (?,?,?);";
	/**
	 * 分页相关，起始位替换符
	 * @author xwj 2020-07-15
	 */
	regSIndReg: RegExp = new RegExp('{sInd}', 'g');
	/**
	 * 分页相关，获取数量替换符
	 * @author xwj 2020-07-15
	 */
	regPageSizeReg: RegExp = new RegExp('{pageSize}', 'g');

	/**
	 * 分页得到短链列表
	 * @author xwj 2020-07-15
	 * @param page 
	 * @param size 
	 * @param bakFun 
	 */
	public list(page: number, size: number, bakFun: Function): void {
		let sInd: number = (page - 1) * size;
		let sql:string = this.sqlList.replace(this.regSIndReg, sInd + '');
		sql = sql.replace(this.regPageSizeReg, size + '');
		mysql_conn.query(sql, '', (err: any, datas: any) => {
			if (err) {
				bakFun(err);
				return;
			}
			mysql_conn.query(this.sqlListCount, '', (err2: any, data2: any) => {
				if (err2) {
					bakFun(err2);
					return;
				}
				let tot: number = 0;
				if (data2 && data2.length) {
					tot = data2[0].tot;
				}
				bakFun(err, { list: datas, total: tot });
			});
		});
	}
	/**
	 * 新增短链接
	 * @author xwj 2020-07-15
	 * @param {string} dUrl 短code
	 * @param {string} tarUrl 目标地址
	 * @param {function} bakFun 回调方法
	 */
	public insert(dUrl: string, tarUrl: string, bakFun: Function): void {
		mysql_conn.query(this.sqlInsertInfo, [dUrl, tarUrl, new Date().getTime(), 0, 0], (err: any, data: any) => {
			if (err) {
				bakFun(err);
			} else {
				let newId: any = data.insertId;
				console.assert(newId, '>model dwz insert short_link [' + dUrl + '][' + newId + '] ...');
				bakFun(err, { id: newId, sCode: dUrl });
			}
		});
	}
	/**
	 * 指定短链信息
	 * @author xwj 2020-07-15
	 * @param {string} dUrl 短code
	 * @param {string} ip 访问ip，认为需要同时记录log
	 * @param {function} bakFun
	 */
	public info(dUrl: string, ip: string, bakFun: Function) {
		// 首先获取目标数据
		mysql_conn.query(this.sqlInfo, [dUrl], (err: any, data: any) => {
			if (err) {
				bakFun(err);
			} else {
				console.assert(ip, '>model dwz info need [' + dUrl + '][' + ip + '] to log ... ');
				if (ip) {
					// 认为是需要记录log的情况
					this.insertLog(dUrl, ip, (lerr: any) => {
						// 记录日志无判定
					});
					// 更新访问情况数据
					this.upInfo(dUrl, (uerr: any) => {
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
	}

	/**
	 * 新增短链访问日志
	 * @author xwj 2020-07-15
	 * @param {string} dUrl 短code
	 * @param {string} ip 访问ip
	 * @param {function} bakFun
	 */
	upInfo(dUrl: string, bakFun: Function) {
		mysql_conn.query(this.sqlUpInfo, [new Date().getTime(), dUrl], (err: any, data: any) => {
			bakFun(err, data);
		});
	}
	/**
	 * 新增短链访问日志
	 * @author xwj 2020-07-15
	 * @param {string} dUrl 短code
	 * @param {string} ip 访问ip
	 * @param {function} bakFun
	 */
	insertLog(dUrl: string, ip: string, bakFun: Function) {
		mysql_conn.query(this.sqlInsertLog, [dUrl, new Date().getTime(), ip], (err: any, data: any) => {
			if (err) {
				bakFun(err);
			} else {
				bakFun(err, data);
			}
		});
	}


}
