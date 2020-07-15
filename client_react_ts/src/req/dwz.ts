import BaseRequest from './baseRequest'

export default class DwzPost {
	/**
	 * 得到短链列表
	 * @author xwj 2020-07-12
	 */
	public static list(params: any | undefined): any {
		return new Promise((resolve, reject) => {
			BaseRequest.get('/dwz/list', params).then((res: any) => {
				resolve(res);
			}).catch((err: any) => {
				reject(err);
			});
		});
	}
	/**
	 * 创建新短链
	 * @author xwj 2020-07-12
	 */
	public static create(params: any | undefined): any {
		return new Promise((resolve, reject) => {
			BaseRequest.get('/dwz/create', params).then((res: any) => {
				resolve(res);
			}).catch((err: any) => {
				reject(err);
			});
		});
	}
	/**
	 * 得到短链目标短链信息
	 * @author xwj 2020-07-12
	 */
	public static info(params: any | undefined): any {
		return new Promise((resolve, reject) => {
			BaseRequest.get('/dwz/info', params).then((res: any) => {
				resolve(res);
			}).catch((err: any) => {
				reject(err);
			});
		});
	}
};

