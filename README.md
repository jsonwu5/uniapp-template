# 头条小程序开发模板

## 使用VSCODE开发

[在vscode中开发uniapp](https://ask.dcloud.net.cn/article/36286)

## 环境安装

	> npm install -g @vue/cli

## 开发环境

	1.安装项目依赖：npm run install
	2.运行项目到头条小程序：npm run dev:mp-toutiao
	3.打开字节跳动小程序开发工具导入项目，路径为项目根路径/dist/dev
	
## 打包部署

	1.打包小程序：npm run build:toutiao
	2.打包H5：npm run build:h5
	3.打包文件夹为/dist/build
	4.使用字节跳动开发者工具上传代码

## 运行并发布uni-app

```
npm run dev:%PLATFORM%
npm run build:%PLATFORM%
```

``%PLATFORM%`` 可取值如下：

|值|平台|
|---|---|
|h5|H5|
|mp-alipay|支付宝小程序|
|mp-baidu|百度小程序|
|mp-weixin|微信小程序|
|mp-toutiao|头条小程序|
|mp-qq|qq 小程序|

可以自定义更多条件编译平台，比如钉钉小程序，参考[package.json文档](https://uniapp.dcloud.io/collocation/package)。
