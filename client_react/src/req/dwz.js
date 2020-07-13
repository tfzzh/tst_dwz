const { get } = require('./baseRequest');

export const reqPost = {
	/**
	 * 得到短链列表
	 * @author xwj 2020-07-12
	 */
	list: params => get('/dwz/list', params),
	/**
	 * 创建新短链
	 * @author xwj 2020-07-12
	 */
	create: params => get('/dwz/create', params),
	/**
	 * 得到短链目标短链信息
	 * @author xwj 2020-07-12
	 */
	info: params => get('/dwz/info', params),
};

