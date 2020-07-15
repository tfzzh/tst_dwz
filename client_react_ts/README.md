# 安装

create-react-app client_react_ts --typescript

npm i @types/antd
npm i @types/axios
npm i @types/moment
npm i @types/qs
npm i @types/react-router-dom
npm i @types/react-notify-toast
npm i @types/http-proxy-middleware
npm i @types/react-loadable

## 特殊注意

* .tsx中，render中方法调用模型
  {
    onXxxx={this.methodName};
    ->
    onXxxx={(e)=>this.methodName(e)};
    ...
    methodName(e){...};
    ->
    methodsName(e:React.yyyyyEvent){...};
    onChange->React.ChangeEvent&gt;HTMLInputElement&lt;
  }
* .tsx中，设置页面相关值
  {
    this.tarParam = tarValue;
    this.setState({
      tarParam: tarValue;
    })
  }

