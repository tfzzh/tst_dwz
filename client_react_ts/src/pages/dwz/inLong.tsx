import React from 'react';
import Notifications, { notify } from 'react-notify-toast';

import DwzLabs from './../components/dwz_labs';

import './dwz.css';

import DwzPost from './../../req/dwz'

export default class DwzLong extends React.Component {
	/**
	 * 长地址
	 * @author xwj 2020-07-15
	 */
	tUrl: string = '';
	/**
	 * 短地址
	 * @author xwj 2020-07-15
	 */
	sUrl: string = '';
	/**
	 * 进行网址缩短操作
	 * @author xwj 2020-07-15
	 */
	toShort() {
		if (!this.tUrl) {
			notify.show('长网址不能为空', 'warning', 2000);
			return;
		}
		const params: any = {
			t: this.tUrl
		};
		DwzPost.create(params).then((res: any) => {
			this.sUrl = res.data.sHost + res.data.sCode;
			this.setState({
				sUrl: res.data.sHost + res.data.sCode,
			});
		});
	};
	/**
	 * 变更目标网址内容
	 * @author xwj 2020-07-12
	 * @param e 数据变更事件
	 */
	changeInput(e: React.ChangeEvent<HTMLInputElement>): void {
		this.tUrl = e.target.value;
		this.setState({
			tUrl: e.target.value
		});
	};
	/**
	 * 监听回车事件
	 * @author xwj 2020-07-12
	 * @param e 按键事件
	 */
	keyupInput(e: React.KeyboardEvent) {
		if (e.keyCode === 13) {
			// 回车，进行数据请求
			this.toShort();
		}
	}
	render() {
		let showShort: any = null;
		if (this.sUrl) { // 如果存在目标短码才显示
			showShort = (<div className="b_f_txt">短网址：<a data-testid="b_l_scode" href={this.sUrl} target="_blank" rel="noopener noreferrer">{this.sUrl}</a></div>);
		}
		return (
			<div className="dwz_root">
				<div className="d_body">
					<DwzLabs tar="cre" />
					<div className="b_input">
						<input type="text" className="b_i_txt" onChange={(e) => this.changeInput(e)} onKeyUp={(e) => this.keyupInput(e)} placeholder="请输入长网址"></input>
						<button data-testid="b_l_sub" onClick={() => this.toShort()}>缩短网址</button>
					</div>
					<div className="b_long">
						{showShort}
					</div>
				</div>
				<Notifications />
			</div>
		);
	}
}
