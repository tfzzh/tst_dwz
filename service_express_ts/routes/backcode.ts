
export class Backcode {
	/**
	 * 正确的返回状态
	 * @author xwj 2020-07-15
	 */
	static ok: number = 200;
	/**
	 * 参数错误：缺少目标地址（长地址）
	 * @author xwj 2020-07-15
	 */
	static param_miss_target_link: number = 311;
	/**
	 * 参数错误：缺少短码
	 * @author xwj 2020-07-15
	 */
	static param_miss_dcode: number = 312;
	/**
	 * 数据问题：通用错误
	 * @author xwj 2020-07-15
	 */
	static db_base_err: number = 601;
}
export interface BackData {
	code: number,
	data?: any,
	err?: any,
};