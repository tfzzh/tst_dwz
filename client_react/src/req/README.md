# 数据请求控制

## baseReuest.js

基础请求及通用处理

* 主要为请求开始与结束进行一些通用处理
  * 增加全局通用参数
  * 对数据请求地址进行统一处理
  * 对返回数据进行通用替换
  * 对请求返回后，增加消息日志
  * 增加请求等待效果
* 具体逻辑请参考实际代码

## *.js

基础模型
{
  const { get, post } = require('./baseRequest');
  ...
  export const reqPost = {
    [tarMethod]: params => get('[tarUrl]', params),
    ...
  };
}
