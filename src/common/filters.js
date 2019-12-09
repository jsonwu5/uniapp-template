import moment from 'moment';

/**
 * 时间格式转换过滤器
 * @param {String} value 时间戳或者时间对象
 * @param {String} format 格式化模板  
 */
exports.formatDate = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
	if (value) {
		return moment(value).format(format);
	}
	return '';
};
