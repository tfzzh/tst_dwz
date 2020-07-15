import Axios from 'axios'
import Qs from 'qs'

Axios.defaults.timeout = 60000;
Axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
/**
 * 请求前的一些通用操作
 * @author xwj 2020-07-12
 */
Axios.interceptors.request.use(config => {
	if (config && config.url && !config.url.startsWith('http')) {
		// 当前统一处理url，之后针对测试环境进行处理
		config.url = 'http://localhost:8021' + config.url;
	}
	if (config && config.data && typeof (config.data) == 'string') {
		return config;
	}
	config.data = Qs.stringify(config.data);
	return config;
}, error => {
	// Do something with request error
	Promise.reject(error)
})
/**
 * 得到返回后的一些通用操作
 * @author xwj 2020-07-12
 */
Axios.interceptors.response.use(response => {
	if (response.status === 200) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(response);
	}
})

export default class BaseRequest {
	/**
	 * post请求
	 * @author xwj 2020-07-16
	 * @param url 
	 * @param params 
	 */
	public static post(url: string, params: any | undefined) {
		return new Promise((resolve, reject) => {
			Axios.post(url, params).then(res => {
				if (res.data.code === 200) {
					resolve(res.data);
				} else {
					alert(res.data.msg);
				}
			}).catch(err => {
				reject(err);
			})
		});
	}
	/**
	 * get请求
	 * @author xwj 2020-07-16
	 * @param url 目标地址
	 * @param params 参数集合
	 */
	public static get(url: string, params: any | undefined): Promise<any> {
		return new Promise((resolve, reject) => {
			Axios.get(url, { params: params }).then(res => {
				if (res.data.code === 200) {
					resolve(res.data);
				} else {
					alert(res.data.msg);
				}
			}).catch(err => {
				reject(err);
			})
		});
	}
}
