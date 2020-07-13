# tst_dwz

一个简单的基于React+Express的超简短网址(dwz)服务

## client_react

基于React的用户前端[说明文件](./client_react/README.md)
启动项目: npm run start
启动前，注意一些配置处理

* 本地开发服务端口[/scripts/start.js](./client_react/scripts/start.js)
  * process.env.PORT[默认为8010]

## service_express

基于Express的后端数据服务[说明文件](./service_express/README.md)
启动项目: npm run start
启动前，注意一些配置处理

* 服务端口[/bin/www](./service_express/bin/www)
  * process.env.PORT[默认为8011]
* 数据库连接[/model/mysql_conn.js](./service_express/model/mysql_conn.js)
  * dbParams={host:'',user:'',password:''} // [连接配置]
  * dbName = '' // [库名配置]
