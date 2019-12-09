/**
 * 将key进行本地映射，方便查找和替换
 */
const KEYS = {
	'token': 'TOKEN',
}

export default {
	checkKey: function(key) {
		if (key.length === 0 || key === undefined || key === null) {
			console.error('key cannot be empty');
			return false;
		}
		if (!KEYS.hasOwnProperty(key)) {
			console.error(`key ${key}` + ' 未在KEYS中映射');
			return false;
		}
		return true;
	},
	setStorage: function(key, data = '') {
		if (!this.checkKey(key)) {
			return;
		}
		return new Promise((resovle, reject) => {
			uni.setStorage({
				key: KEYS[key],
				data,
				success: (res) => {
					resovle(res);
				},
				fail: err => {
					reject(err);
				}
			});
		});
	},
	/**
	 * 异步获取缓存的值
	 * @param {Object} key
	 */
	getStorage: function(key) {
		if (!this.checkKey(key)) {
			return;
		}
		return new Promise((resolve, reject) => {
			uni.getStorage({
				key: KEYS[key],
				success: function(res) {
					resolve(res);
				},
				fail: (err) => {
					reject(err);
				}
			});
		})
	},
	/**
	 * 同步获取缓存的值
	 * @param {Object} key
	 */
	getStorageSync: function(key) {
		if (!this.checkKey(key)) {
			return;
		}
		try {
			const value = uni.getStorageSync(KEYS[key]);
			if (value) {
				return value;
			}
		} catch (e) {
			// error
			console.error(e);
		}
	}
}
