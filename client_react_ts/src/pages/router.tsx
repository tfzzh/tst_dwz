import * as React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';


export default class PageRouter extends React.Component {
	/**
	 * 路由列表，之后考虑按功能分组
	 * @author xwj 2020-07-16
	 */
	routs: Array<RouteInfo> = [
		{
			key: '/cre',
			loadImport: () => import('./dwz/inLong').then(a => a.default)
		},
		{
			key: '/info',
			loadImport: () => import('./dwz/inShort').then(a => a.default)
		},
		{
			key: '/list',
			loadImport: () => import('./dwz/inList').then(a => a.default)
		}
	];
	render() {
		return (
			<Router>
				{/* 动态铺路由数据 */}
				{
					this.routs.map(function (ite, ind) {
						return (
							<Route key={'r_' + ind} path={ite.key} component={Loadable({
								loader: ite.loadImport,
								loading() {
									return <div className="r_load"><div>Loading...</div></div>
								}
							})} />
						)
					})
				}
				{/* 默认入口 */}
				<Route path="/" render={
					() => (
						<Redirect to="/cre" />
					)
				}></Route>
			</Router>
		)
	}
}
/**
 * 陆游信息
 * @author xwj 2020-07-16
 */
interface RouteInfo {
	/**
	 * 路由名
	 * @author xwj 2020-07-16
	 */
	key: string,
	/**
	 * 按需加载控制
	 * @author xwj 2020-07-16
	 */
	loadImport: any,
}


