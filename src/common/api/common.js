import Request from '@/plugins/pocky-request/index.js';
import { tenantId } from '@/config.js';

export default {
	// 抖音授权登录
	commonLogin(providerAccessCode) {
		return Request().post('/api/account/external-auth', {
			data: {
				// 抖音授权code
				providerAccessCode
			},
			header: {
				// 商户唯一标识，只在登录的时候传给后台
				__tenant: tenantId
			}
		});
	},
	/**
	 * 同步小程序加密敏感数据
	 * @param {Object} params
	 */
	commonAccount(params) {
		return Request().post('/api/account/external-sync', {
			data: Object.assign({}, {
				type: 'userinfo', // 数据类型 userinfo/phonenumber
				encryptedData: '', // 包括敏感数据在内的完整用户信息的加密数据
				iv: '', // 	加密算法的初始向量
				signature: '' // 签名数据
				// rawData: {}
			}, params)
		});
	}
};
