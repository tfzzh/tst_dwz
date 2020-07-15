import * as express from 'express';

import { dwzRegist } from './dwz';

export const route = (app: express.Express) => {
	// 分功能内部注册
	dwzRegist(app);
};
