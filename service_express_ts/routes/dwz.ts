import * as express from 'express';

import { ModelDwz } from './../model/dwz';
import { Backcode, BackData } from './backcode';

import { RandomCode } from './../utils/random_code';

class DwzView {

	static model_dwz: ModelDwz = new ModelDwz();

	/**
	 * 得到所有请求参数
	 * @author xwj 2020-07-15
	 * @param req 请求消息
	 */
	static getAllParams(req: express.Request): object {
		let query: object = req.query ? req.query : {};
		let body: object = req.body ? req.body : {};
		let params: object = req.params ? req.params : {};
		let allParams: object = {};
		Object.assign(allParams, query, body, params);
		return allParams;
	}
	/**
	 * 创建短码
	 * @author xwj 2020-07-15
	 * @param req 请求消息{t:目标转码url}
	 * @param res 返回消息
	 */
	static create(req: express.Request, res: express.Response): void {
		let allParams: object = DwzView.getAllParams(req);
		// 短链相关处理
		if (allParams && allParams['t']) {
		} else {
			const errData: BackData = {
				code: Backcode.param_miss_target_link
			};
			res.send(JSON.stringify(errData));
			return;
		}
		let tUrl: string = decodeURIComponent(allParams['t']);
		// 默认填充http://
		if (!tUrl.startsWith('http://') && !tUrl.startsWith('https://')) {
			tUrl = 'http://' + tUrl;
		}
		let shortCode: string = RandomCode.shortCode(8);
		DwzView.model_dwz.insert(shortCode, tUrl, (err, data) => {
			let bakData: BackData = {
				code: Backcode.ok,
			};
			if (err) {
				bakData.code = Backcode.db_base_err;
				bakData.err = {
					errno: err.errno,
					sqlcode: err.code,
					errmsg: err.sqlMessage,
					sqlstate: err.sqlState,
					sql: err.sql,
				};
			} else {
				let host: string = req.headers.host;
				if (host.endsWith(':80')) {
					host = host.substring(0, host.length - 3);
				}
				data.sHost = 'http://' + host + '/';
				bakData.data = data;
			}
			res.send(JSON.stringify(bakData));
		});
	}
	/**
	 * 得到短码列表
	 * @author xwj 2020-07-15
	 * @param req 请求消息{p:目标页数,s:页数据量}
	 * @param res 返回消息
	 */
	static list(req: express.Request, res: express.Response): void {
		let allParams: object = DwzView.getAllParams(req);
		// 分页参数相关
		let page: number = 1;
		let size: number = 20;
		if (allParams && allParams['s']) {
			let ps: number = parseInt(allParams['s'], 10);
			if (ps === NaN) {
			} else if (ps < 5) {
				size = 5;
			} else if (ps > 100) {
				size = 100;
			} else {
				size = ps;
			}
		}
		if (allParams && allParams['p']) {
			let pp: number = parseInt(allParams['p'], 10);
			if (pp === NaN) {
			} else if (pp < 2) {
			} else {
				page = pp;
			}
		}
		DwzView.model_dwz.list(page, size, (err: any, data: any) => {
			let bakData: BackData = {
				code: Backcode.ok,
			};
			if (err) {
				// 之后针对不同的err，进行不同的code处理
				bakData.code = Backcode.db_base_err;
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

	/**
	 * 得到短码信息，该方式，不记录请求日志
	 * @author xwj 2020-07-15
	 * @param req 请求消息{d:目标短码}
	 * @param res 返回消息
	 */
	static info(req: express.Request, res: express.Response): void {
		let allParams: object = DwzView.getAllParams(req);
		let dUrl: string = '';
		if (allParams && allParams['d']) {
			dUrl = allParams['d'];
		} else {
			const errData: BackData = {
				code: Backcode.param_miss_dcode
			};
			res.send(JSON.stringify(errData));
			return;
		}
		DwzView.model_dwz.info(dUrl, '', (err: any, data: any) => {
			let bakData: BackData = {
				code: Backcode.ok,
			};
			if (err) {
				// 之后针对不同的err，进行不同的code处理
				bakData.code = Backcode.db_base_err;
				bakData.err = {
					errno: err.errno,
					sqlcode: err.code,
					errmsg: err.sqlMessage,
					sqlstate: err.sqlState,
					sql: err.sql,
				};
			} else {
				if (data) {
					let host: string = req.headers.host;
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

const router = express.Router();

export const dwzRegist = (app: express.Express) => {
	app.use('/dwz', router.get('/list', DwzView.list));
	app.use('/dwz', router.get('/create', DwzView.create));
	app.use('/dwz', router.get('/info', DwzView.info));
}
