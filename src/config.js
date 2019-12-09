/**
 * 项目基本配置
 */

// CLI构建需要修改的配置参数
const config = {
	tenantId: '%TENANTID%', // 商铺ID
	version: '%VERSION%' // 代码版本号
}

export let tenantId = ''; // 商铺ID
export let baseUrl = ''; // API地址

// 开发环境配置
const dev = {
	// 0601d7e7-c9ed-5da1-2af7-39f1a02f57f0 营智
	// b6527e14-cd62-dbc3-46ae-39f1b36916e3 一抖
	baseUrl: 'http://api.alpha.shiyundongli.com',
	tenantId: 'b077fb96-0a08-ff44-67fa-39f1a3f3f044' // alpha环境
	// baseUrl: 'http://api.beta.shiyundongli.com',
	// tenantId: '0601d7e7-c9ed-5da1-2af7-39f1a02f57f0'
}

// 生产环境配置
const prod = {
	baseUrl: 'https://api.shiyundongli.com',
	tenantId: '0601d7e7-c9ed-5da1-2af7-39f1a02f57f0'
}

// 开发环境
if (process.env.NODE_ENV === 'development') {
	// 商户唯一标识，只在登录的时候传给后台
	tenantId = dev.tenantId;
	// 接口地址
	baseUrl = dev.baseUrl;
} else { // 生产环境
	tenantId = config.tenantId === '%TENANTID%' ? prod.tenantId : config.tenantId;
	baseUrl = prod.baseUrl;
}

// H5端临时用的token
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYmViNThiOC05OTkzLWE2NDQtYmI0MC0zOWYxYTAzOGVlZGUiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IlhERlNNSkw2WFA2RFVPVUUzVFVYSTRJUDNTUkZDR09aIiwidGVuYW50aWQiOiIwNjAxZDdlNy1jOWVkLTVkYTEtMmFmNy0zOWYxYTAyZjU3ZjAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkb3V5aW5fdXNlcl80ODI0NzA2MTEiLCJuYW1lIjoiZG91eWluX3VzZXJfNDgyNDcwNjExIiwiZW1haWwiOiJkb3V5aW5fYW5vbnltb3VzXzEwMTcwMDA0MkBjdXN0b21lcnMuc2hpeXVuLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmJmIjoxNTc0NzQ4NjI5LCJleHAiOjE1NzQ4MzUwMjksImlzcyI6IkJhbGR1ciIsImF1ZCI6IkJhbGR1ciJ9.a8DSfPUZx_ozyOkuzJsDmUUq3usUaBnB97hq4xZBTOM';