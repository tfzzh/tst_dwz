# tst_dwz

一个简单的基于React+Express的超简短网址(dwz)服务
[项目github](https://github.com/tfzzh/tst_dwz)
[项目下载](https://github.com/tfzzh/tst_dwz.git)

## client_react

基于React的用户前端[说明文件](./client_react/README.md)
启动项目: npm run start
启动前，注意一些配置处理

* 本地开发服务端口[/scripts/start.js](./client_react/scripts/start.js)
  * process.env.PORT[默认为8010]

项目测试: npm run test
[测试入口文件](./client_react/src/App.test.js)
[项目测试结果](./client_react/test/README.md)

## service_express

基于Express的后端数据服务[说明文件](./service_express/README.md)
启动项目: npm run start
启动前，注意一些配置处理

* 服务端口[/bin/www](./service_express/bin/www)
  * process.env.PORT[默认为8011]
* 数据库连接[/model/mysql_conn.js](./service_express/model/mysql_conn.js)
  * dbParams={host:'',user:'',password:''} // [连接配置]
  * dbName = '' // [库名配置]
  * 如果目标库不存在，会在项目启动后自动创建库与表

项目测试: npm run test
[测试入口文件](./service_express/test/app.spec.js)
[项目测试说明](./service_express/test/README.md)

### 数据库结构

[库初始化文件](./init.sql)

## 图说明

[前端架构设计图（计划）](./短网址-前端架构设计图（计划）.png)
  上图为目标模型并非当前模型
[界面数据交互流程](./短网址-界面数据交互流程.png)

[Express架构图](./短网址-Express架构图.png)
[Express数据服务启动流程](./短网址-Express数据服务启动流程.png)
