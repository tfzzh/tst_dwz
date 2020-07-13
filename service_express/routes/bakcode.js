const code = {
	ok: 200,
	param_err: { // 请求参数问题 300+
		miss_param_link: 311, // 目标url不存在
		miss_param_d_link: 312, // 目标短code不存在
	},
	db_err: { // 数据交互问题 600+
		base_err: 601,
	},
};

module.exports = code;
