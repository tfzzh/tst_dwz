# 模型层

针对与数据库的数据交互

## mysql_conn.js

主要与mysql交互相关操作

### 数据库连接配置

{
  // 基础数据库请求参数
  let dbParams = {
    host: 'localhost',
    user: 'root',
    password: 'root',
  };
  // 数据库名
  let dbName = 'tst_dwz1';
  // 所相关数据表名
  let tabName = {
    d_link: '`d_link`',
    d_link_log: '`d_link_log`',
  }
}

### 入口方法

* query:数据交互入口方法，仅针对功能模块进行直接调用，不能被routes中的入口方法中直接调用
{
  const mysql_conn = require('./mysql_conn');
  ...
  mysql_conn.query(sql,[dUrl, tarUrl, new Date().getTime(), 0, 0], (err, data) => {
}
* tabName:所有相关操作的表的名字，建议所有sql相关的表名获取，均从此进行
{
  const mysql_conn = require('./mysql_conn');
  ...
  sql: {
    list: "select * from " + mysql_conn.tabName.d_link + " order by id desc limit {sInd}, {pageSize}";
    listCount: "select count(0) as tot from " + mysql_conn.tabName.d_link;
}

### 初始化库

如果发现目标库不存在，则自动创建目标库，并同时创建所有表
这时为调用[init_db.js]中操作
{
  function createDb(sql, sqlParams, bakFun) {
    let init = require('./init_db');
    init.initDb(dbName, dbParams, (err) => {
      if (!err) {
        // 因成功，从新进行请求
        query(sql, sqlParams, bakFun);
      } else {
        // 失败直接返回
        bakFun(err);
      }
    });
  }
}

## init_db.js

数据库初始化相关操作，包括一些独立的数据库交互控制
之后还需要完善版本更新相关的表结构变化处理

* initDb:初始化整个库，包括表初始化
* initTable: 初始化所有表

* init_sql:中记录相关操作的sql语句

## dwz.js (功能|模块通用模式)

短网址模块相关数据库层操作
目标基础结构
{
  // [调用基础mysql连接]
  const mysql_conn = require('./mysql_conn');
  ...
  const db = { // [主结构]
    sql: { // [需求相关所有sql集合]
      ...
      // 短链列表
      list: "select * from " + [mysql_conn.tabName.d_link(调用的方式获取表名)] + " order by id desc limit {sInd}, {pageSize}",
      // 短链总量
      listCount: "select count(0) as tot from " + mysql_conn.tabName.d_link,
      ...
    },
    reg: { // [一些通用替换]
      ...
      sIndReg: new RegExp('{sInd}', 'g'),
      ...
    },
    iface: { // [用于对外调用方法]
      ...
    },
    methods: { // [仅用于内部调用方法]
      ...
    }
  }

  // [对外调用]
  module.exports = db.iface;
}
