# 数据后端

## install

npm i express-generator -g [express脚手架]
express --view=ejs proj_name|service_express [初始化express项目]
npm i mysql [mysql连接支持]
npm i nodemon -g [支持动态修改]

## 结构说明

* 启动文件(默认):/bin/www
  * 可以在头部增加:[process.env.PORT='8011'|xxxx;]，用于自定义服务接口
* app.js
  * 项目基础配置相关
  * 基础http访问配置
  * 访问路由配置:
    {
      ...
      let configRouter = require('./routes/config');
      ...
      var app = express();
      ...
      configRouter.regist(app);
    }
  * 相关短网址请求的跳转目标操作
* /routes/ [路由相关控制]
  具体参考[/routes/README.md](./routes/README.md)
* /model/ [数据持久交互相关控制]
  具体参考[/model/README.md](./model/README.md)
* /views/ [一些基础公用页面]
  * /views/error.ejs [404]
* /utils/ [工具文件相关]
  具体参考[/utils/README.md](./utils/README.md)

## 修改启动配置

因开发环境需要自动更新
首先安装: npm i nodemon -g
package.json->{
  "scripts": {
    "start": "node ./bin/www"
  },
  -->
  "scripts": {
    "start": "nodemon ./bin/www"
  },
}
