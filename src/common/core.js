export default {
	/**
	 * 路由跳转简单封装
	 * @param {String} url 
	 * @param {String} type 跳转类型 save：保留当前页面跳转， close：关闭当前页面跳转，closeAll： 重定向页面，tabbar：跳转到tabbar
	 * @param {Object} query 页面传值参数对象  
	 * @example 在onLoad(option) {} 中使用 JSON.parse(decodeURIComponent(option.query)); 处理接收到的参数
	 */
	route: function(url, query = {}, type = 'save') {
		if (url.length === 0 || url === undefined) {
			console.error('url is not undefined');
			return;
		}
		let urlParam = url + this.encodeURL(query);
		switch (type) {
			case 'save':
				// 在起始页面跳转到test.vue页面并传递参数
				return new Promise((resolve, reject) => {
					uni.navigateTo({
						url: urlParam,
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
				break;
			case 'close':
				// 关闭当前页面，跳转到应用内的某个页面。
				// 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。
				return new Promise((resolve, reject) => {
					uni.redirectTo({
						url: urlParam,
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
				break;
			case 'closeAll':
				// 关闭所有页面，打开到应用内的某个页面。
				// 需要跳转的应用内页面路径 , 路径后可以带参数。
				// 如果跳转的页面路径是 tabBar 页面则不能带参数
				return new Promise((resolve, reject) => {
					uni.reLaunch({
						url: urlParam,
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
				break;
			case 'tabBar':
				// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
				// 需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
				return new Promise((resolve, reject) => {
					uni.switchTab({
						url,
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
				break;
		}
	},
	/**
	 * 返回上一页 / 之前第N页
	 * @param {Number} delta 返回的层级
	 */
	back: function(delta) {
		uni.navigateBack({
			delta
		});
	},
	/**
	 * 抖音授权登录
	 */
	authorLogin: function() {
		return new Promise((resolve, reject) => {
			// 获取用户信息
			uni.login({
				success: (res) => {
					resolve(Object.assign(res, {
						succeeded: true
					}))
				},
				fail: (err) => {
					resolve(Object.assign(err, {
						succeeded: false
					}))
				}
			});
		})
	},
	/**
	 * 获取用户信息
	 * @param {Boolean} withCredentials 是否返回敏感信息
	 */
	getUserInfo: function(withCredentials = false) {
		console.log('申请获取用户信息')
		return new Promise((resolve, reject) => {
			// 获取用户信息
			uni.getUserInfo({
				withCredentials, // 是否返回敏感信息
				success: (res) => {
					console.log('用户信息：%o', res);
					resolve(Object.assign(res, {
						succeeded: true
					}))
				},
				fail: (err) => {
					resolve(Object.assign(err, {
						succeeded: false
					}))
				}
			});
		})
	},
	/**
	 * 打开小程序设置
	 */
	openSetting: function() {
		return new Promise((resolve, reject) => {
			uni.openSetting({
				success: (res) => {
					resolve(Object.assign(res, {
						succeeded: true
					}))
				},
				fail: (err) => {
					resolve(Object.assign(err, {
						succeeded: false
					}))
				}
			})
		})
	},
	/**
	 * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，
	 * 但不会实际调用对应接口。
	 * 如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
	 */
	authorize: function(scope = 'scope.userInfo') {
		return new Promise((resolve, reject) => {
			uni.authorize({
				scope,
				success: (re) => {
					resolve(Object.assign(res, {
						succeeded: true
					}))
				},
				fail: (err) => {
					resolve(Object.assign(err, {
						succeeded: false
					}))
				}
			})
		})
	},
	/**
	 * 获取图片信息
	 * @param {String} url 图片地址 
	 */
	getImageInfo: function (url) {
		return new Promise((resolve, reject) => {
			uni.getImageInfo({
				src: url,
				success: image => {
					resolve(Object.assign(image, {
						succeeded: true
					}))
				},
				fail: err => {
					resolve(Object.assign(err, {
						succeeded: false
					}))
				}
			});
		})
	},
	/**
	 * 保存图片到相册
	 * @param {String} path 图片路径
	 */
	saveImage: function (path) {
		return new Promise((resolve, reject) => {
			uni.saveImageToPhotosAlbum({
				filePath: path,
				success: res => {
					resolve(Object.assign(res, {
						succeeded: true
					}))
				},
				fail: err => {
					resolve(Object.assign(err, {
						succeeded: false
					}))
				}
			});
		})
	},
	checkPhone: function (phone) {
		let pattern = /(^1[3|4|5|7|8][0-9]{9}$)/;
		return pattern.test(phone);
	},
	checkEmail: function (email) {
		let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		return pattern.test(email);
	},
	/**
	 * 给路由参数编码
	 * @param {Object} query 参数集 
	 */
	encodeURL: function (query = {}) {
		// 传值编码处理
		let queryStr = encodeURIComponent(JSON.stringify(query));
		if (JSON.stringify(query) === '{}') {
			queryStr = '';
		}
		return queryStr.length > 0 ? '?query=' + queryStr : '';
	},
	/**
	 * 解码路由参数
	 * @param {Object} e
	 */
	decodeURL: function (e) {
		let option = JSON.parse(decodeURIComponent(e.query));
		console.log('路由参数:%o,解码后参数:%s', e, option);
		return option;
	}
}
