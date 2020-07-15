import * as express from 'express';
import * as createHttpError from 'http-errors';

import { MysqlConnectioin } from './model/mysql_connection';
import { route } from './routes/config';

import { ModelDwz } from './model/dwz';// add xwj 2020-07-16

const model_dwz: ModelDwz = new ModelDwz();

const app = express();

app.use(express.static('public'));
app.all('*', function (req: express.Request, res: express.Response, next: express.NextFunction) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

/**
 * 错误页面显示
 * @author xwj 2020-07-11
 * @param {any} err 
 * @param {Response} res 
 */
function showErrorPage(err: any, res: express.Response) {
	res.locals.message = err.message;
	// render the error page
	res.status(err.status || 500);
	// res.render('error');
	res.render('error');
}

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

	// catch 404 and forward to error handler
	app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
		console.log("ready 404");
		next(createHttpError(404));
	});

	// error handler
	app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
		// set locals, only providing error in development
		// change xwj 2020-07-11
		console.log('app err req >> [' + req.url + ']');
		let path: string = req.url.substr(1);
		console.assert(path.length !== 8, 'app req maybe short link [' + path + '] ... ');
		if (path.length === 8) {// 这里暂定短code一定是8位长
			// 这里未进行更多判定，直接进行数据库获取
			model_dwz.info(path, req.ip, (derr: any, data: any) => {
				// console.log(" path ... ", data);
				if (derr) {
				} else {
					if (data && data.tar_url) {
						// 因为存在目标，所以进行目标跳转
						res.redirect(data.tar_url);
						return;
					}
				}
				// 去到错误页面
				res.locals.error = req.app.get('env') === 'development' ? err : {};
				showErrorPage(err, res);
			});
		} else {
			// 去到错误页面
			res.locals.error = req.app.get('env') === 'development' ? err : {};
			showErrorPage(err, res);
		}
	});
	// 启动服务
	const server = app.listen(8021, 'localhost', () => {
		console.log('start on 8021');
	});
});


