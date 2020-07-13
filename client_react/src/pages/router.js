
import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
/**
 * 路由配置集合
 * @author xwj 2020-07-12
 */
const routs = [
	{
		k: '/cre',
		ld: () => import('./dwz/inLong').then(a => a.default),
	},
	{
		k: '/info',
		ld: () => import('./dwz/inShort').then(a => a.default),
	},
	{
		k: '/list',
		ld: () => import('./dwz/inList').then(a => a.default),
	},
];
/**
 * 路由配置处理
 * @author xwj 2020-07-12
 */
function router() {
	return (
		<Router>
			{/* 动态铺路由数据 */}
			{
				routs.map(function (ite, ind) {
					return (
						<Route key={'r_' + ind} path={ite.k} component={Loadable({
							loader: ite.ld,
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
	);
}

export default router;
