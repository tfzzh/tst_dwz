import * as express from 'express';

import { MysqlConnectioin } from './model/mysql_connection';
import { route } from './routes/config';

const app = express();

app.use(express.static('public'));

/**
 * 验证库是否存在 如果不存在则创建
 * @author xwj 2020-07-15
 */
MysqlConnectioin.validateDb((err: any) => {
	if (err) {
		console.error("Service failed to start [db init error]", err);
	}
	// 进行路由初始化
	route(app);
	// 启动服务
	const server = app.listen(8021, 'localhost', () => {
		console.log('start on 8021');
	});
});


