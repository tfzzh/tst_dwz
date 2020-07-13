# 路由及功能页面相关

## router.js

主要路由控制及配置
{
  import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'; // [路由相关]
  import Loadable from 'react-loadable'; // [路由按需加载]
  ...
  const routs = [{ // [路由配置]之后考虑多模块的配置方式
    k: '/cre', // [入口路由地址]
    ld: () => import('./dwz/inLong').then(a => a.default), // [懒加载相关配置，'./dwz/inLong'为页面路径]
  },...]
}

## **/*.js

功能页面基础模型
{
  import React, { Component } from 'react'; // [基础需求]
  import { Link } from 'react-router-dom'; // [路由跳转相关]
  ...
  import './xxx.css'; // [加载必要的css]
  ...
  const { xxxPost } = require('./**/req/xxx'); // [功能请求相关，路径需根据实际情况处理]
  ...
  class PageName extends Component { // [具体的页面内容]
    state = {}; // [全局数据]
    ...
    methods ... [各种页面相关方法]
    ...
      reqData:()=>{ // [请求数据相关方法]
        const params = {};
        [组合请求参数相关]
        const that = this;
        xxxPost.tarMethod(params).then((res)=>{
          ... [具体的数据操作相关]
          that.setState({
            ... [具体的页面数据设置]
          });
          ...
        })
      }
    ...
    componentDidMount ...  [一些页面生命周期方法，视具体情况]
    ...
    render() { // [页面渲染部分]
      ... [一些动态内容处理]
      return (
        ... [具体的页面处理部分]
        &gt;Link to="/route"&lt;名称&gt;/Link&lt; // [跳转路由相关]
      );
    };
  }
  export default PageName;
}

## **/*.css

功能页面样式
