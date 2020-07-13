# 路由相关控制

## config.js

自动化路由配置
针对路径/routes/**/*.js下的自动化入口请求路由配置
包括入口请求路由自动化注册方法，所有需要被自动注册的入口请求需要以独立的至少一级上层路径的独立文件模式存在[如:./dwz/create.js]，并满足一定文件结构，然后会被自动注册为同路径请求[上例访问地址:host/dwz/create]，现均为get方式

* 对应request默认全参数属性 [req.allParams]
* 之后考虑根据文件名来区分请求方式，默认为get，前缀为p_的是post支持，前缀为a_的是get\post双支持，其他协议支持再另

## bakcode.js

全局返回消息码统一记录文件
需要根据不同模块或模式进行分类

## dwz/**/* (通用模式)

短网址服务相关
文件必要存在(无exec的，不会被自动注册)
{
  module.exports = { exec: func }
}

### 主要逻辑

* 参数验证及默认值逻辑
* 与目标模型层交互逻辑
  {
    const model_dwz = require('./../../model/dwz');
    const bak_code = require('./../bakcode');
    ...
    exec: (req, res, next) => {
      let parm = req.allParams; [请求全参数]
      ...
      model_dwz.info({params}, (err, data) => {
        let bakData = {
          code: bak_code.ok,
        };
        ...
        bakData.data = data;
        ...
        res.send(JSON.stringify(bakData));
      });
    }
  }

### dwz/tst

仅为测试功能，而延续存在
