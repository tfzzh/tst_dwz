import axios from 'axios'
import Qs from 'qs'

axios.defaults.timeout = 60000;
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
/**
 * 请求前的一些通用操作
 * @author xwj 2020-07-12
 */
axios.interceptors.request.use(config => {
	if (!config.url.startsWith('http')) {
		// 当前统一处理url，之后针对测试环境进行处理
		config.url = './api/' + config.url;
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
axios.interceptors.response.use(response => {
	if (response.status === 200) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(response);
	}
})

/**
 * post请求
 * @author xwj 2020-07-12
 * @param {*} url 目标数据url
 * @param {*} params 相关的参数集合
 */
export function post(url, params) {
	let t1 = new Date().getTime();
	readyRequest(params);
	return new Promise((resolve, reject) => {
		axios.post(url, params).then(res => {
			saveReqLog(url, params, 'ok', t1);
			if (res.data.code === 200) {
				resolve(bakResData(res.data));
			} else {
				alert(res.data.msg);
			}
		}).catch(err => {
			saveReqLog(url, params, (err.message ? err.message : err), t1);
			reject(err);
		})
	})
}
/**
 * get请求
 * @author xwj 2020-07-12
 * @param {*} url 
 * @param {*} params 
 */
export function get(url, params) {
	let t1 = new Date().getTime();
	readyRequest(params);
	return new Promise((resolve, reject) => {
		axios.get(url, { params: params }).then(res => {
			saveReqLog(url, params, 'ok', t1);
			if (res.data.code === 200) {
				resolve(bakResData(res.data));
			} else {
				alert(res.data.msg);
			}
		}).catch(err => {
			saveReqLog(url, params, (err.message ? err.message : err), t1);
		})
	})
}
/**
 * 记录请求结果用，一般仅针对app打包项目等一些不好直观看到console.log的线上环境
 * @author xwj 2020-07-12
 * @param {} url 
 * @param {*} param 
 * @param {*} status 
 * @param {*} t1 
 */
function saveReqLog(url, param, status, t1) {
	// let host = window.location.host;
	// if (host.indexOf('localhost') !== -1) {
	// 	 // 认为是测试环境，不进行多余处理；
	// 	 return;
	// }
	// if (!param) {
	// 	 param = {};
	// }
	// let lp = {
	// 	 t:(new Date().getTime() - t1),// 消耗时间
	// 	 u:url, // 请求地址
	// 	 s:status, // 状态
	// 	 p:Qs.stringify(param), // 参数
	// };
	// axios.get('xxxxx', { params: lp });
}
/**
 * 请求时，可能存在的对一些特殊参数的处理
 * @author xwj 2020-07-12
 * @param {object} params 
 */
function readyRequest(params) {
}
/**
 * 返回请求得到的数据
 * 可能存在一些通用处理部分，比如整体替换一些内容
 * @author xwj 2020-07-12
 * @param {} resData 
 */
function bakResData(resData) {
	return resData;
}
