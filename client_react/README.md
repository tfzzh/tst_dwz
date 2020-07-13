# 用户前端

## install

npm i create-react-app [react脚手架]
npx create-react-app my-app|client_react [初始化react项目]
npm i react-router-dom [基于react的路由支持]
npm i react-notify-toast [基于react的简版Toast支持]
npm i http-proxy-middleware [数据跨域访问支持，更多针对测试环境]
npm i react-loadable [路由文件按需加载支持]

npm i axios [数据请求插件]
npm i qs [请求数据参数处理插件]
npm i antd [可用于react的样式库]
npm i moment [时间格式化工具]

## 结构说明

* 启动文件(默认):/scripts/start.js
  * 可以在头部增加:[process.env.PORT='8010'|xxxx;]，用于自定义本地测试服务接口
* /src/ [前端源码包]
  具体参考[/src/README.md](./src/README.md) 
