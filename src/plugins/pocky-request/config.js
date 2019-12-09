import Interceptor from './core/interceptor';
import Request from './index';
import { baseUrl, tenantId } from '@/config.js';
import store from '@/store';
import $core from '@/common/core.js';
import $ui from '@/common/ui.js';
import $http from '@/common/api/index.js';

export const globalInterceptor = {
	request: new Interceptor(),
	response: new Interceptor()
};

/**
 * 全局配置
 * 只能配置 静态数据
 * `content-type` 默认为 application/json
 * header 中`content-type`设置特殊参数 或 配置其他会导致触发 跨域 问题，出现跨域会直接进入响应拦截器的catch函数中
 */
export const config = {
	baseURL: baseUrl,
	// dataType: 'json',
	// responseType: 'text',
	header: {
		'Content-Type': 'application/json',
		'__tenant': tenantId
	}
};

// 忽略token的API地址
const ignoreUrl = ['/api/account/external-auth']

/**
 * 全局 请求拦截器
 * 例如: 配置token
 *
 * `return config` 继续发送请求
 * `return false` 会停止发送请求，不会进入错误数据拦截，也不会进入请求对象中的catch函数中
 * `return Promise.reject('xxxxx')` 停止发送请求, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} config 发送请求的配置数据
 */
globalInterceptor.request.use(
	(config) => {
		// console.log('请求拦截配置数据:', config);
		// 动态添加token
		if (ignoreUrl.indexOf(config.instanceURL) === -1) {
			config.header.Authorization = `Bearer ${store.state.token}`;
		}
		return config;
	},
	(err) => {
		console.error('请求前报错: ', err);
		return false;
	}
);

/**
 * 全局 响应拦截器
 * 例如: 根据状态码选择性拦截、过滤转换数据
 *
 * `return res` 继续返回数据
 * `return false` 停止返回数据，不会进入错误数据拦截，也不会进入catch函数中
 * `return Promise.reject('xxxxx')` 返回错误信息, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} res 请求返回的数据
 * @param {Object} config 发送请求的配置数据
 * @return {Object|Boolean|Promise<reject>}
 */
globalInterceptor.response.use(
	(res, config) => {
		// 后台正常响应数据
		// console.log('响应拦截:', res);
		if (!config.count) {
			config.count = 0;
		}
		// console.log('config:', config);
		// 用code模拟http状态码
		const code = parseInt(res.statusCode);
		if (code >= 200 && code < 300) {
			return res;
		} else if ((code == 401 || code === 403) && config.count <= 1) {  // token 验证失败
			// 手机号未绑定, 跳到登录页面
			if (store.state.hasLogin && !store.getters.hasPhone) {
				$core.route('/pages/public/login');
				return false;
			}
			config.count++;
			config.url = config.instanceURL;
			// 申请授权成功后重新发起请求
			return userLogin().then(flag => flag ? Request().request(config) : false);
		} else {
			return Promise.reject(Object.assign({}, res, {config}));
		}
	},
	(err, config) => {
		// 在请求时报错,后台未响应
		// console.error('请求后异常: ', err);
		// console.error('请求后数据: ', config);
		let msg = '内部服务器异常';
		if (err.data.error && err.data.error.message) {
			msg = err.data.error.message;
		}
		// 关闭加载弹窗
		$ui.hideLoading();
		$ui.toast(msg);
		const {
			errMsg,
			data
		} = err;

		return Promise.reject({
			errMsg,
			data,
			config
		});
	}
);

// 申请授权登录
async function userLogin() {
	$ui.loading();
	// 申请抖音授权登录
	let loginRes = await $core.authorLogin();
	// console.log('登录被拒绝:', loginRes.succeeded);
	// 抖音登录接口异常，登录失败
	if (!loginRes.succeeded) {
		$ui.hideLoading();
		$ui.toast('请先登录App账户');
		return false;
	}
	// 用户登录，获取token并缓存
	await $http.commonLogin(loginRes.code).then(res => {
		// console.log('获取到token', new Date().toLocaleString());
		if (res.data.hasOwnProperty('accessToken') && res.data.accessToken) {
			store.commit('setUserInfo',res.data);
			store.commit('setToken', res.data.accessToken);
			$ui.hideLoading();
		}
	});
	return true;
}