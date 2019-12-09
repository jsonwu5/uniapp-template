export default {
	toast: function(title = '标题', duration = 1500, icon = 'none') {
		return new Promise((resolve, reject) => {
			uni.showToast({
				title,
				duration,
				icon,
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err);
				}
			});
		})
	},
	hideToast: function() {
		uni.hideToast();
	},
	alert: function(content = '', title = '提示') {
		return new Promise((resolve, reject) => {
			this.confirm({
				title,
				content,
				showCancel: false
			}).then(res => {
				resolve(res);
			})
		});
	},
	confirm: function(params) {
		return new Promise((resolve, reject) => {
			uni.showModal(Object.assign({}, {
				title: '提示',
				content: '',
				showCancel: true,
				cancelText: '取消',
				// cancelColor: '',
				confirmText: '确认',
				// confirmColor: '',,
				success: (res) => {
					if (res.confirm) {
						// console.log('用户点击确定');
						resolve(true);
					} else if (res.cancel) {
						// console.log('用户点击取消');
						resolve(false);
					}
				},
				fail: (err) => {
					reject(err);
				}
			}, params));
		});
	},
	loading: function(title = '加载中...', mask = false) {
		return new Promise((resolve, reject) => {
			// #ifdef MP-MP-TOUTIAO
			uni.showLoading({
				title,
				success: resolve,
				fail: reject
			});
			// #endif
			// #ifndef MP-MP-TOUTIAO
			uni.showLoading({
				title,
				mask,
				success: resolve,
				fail: reject
			});
			// #endif
		})
	},
	hideLoading: function() {
		uni.hideLoading()
	}
}
