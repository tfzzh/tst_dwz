import React from 'react';
import Notifications, { notify } from 'react-notify-toast';

import DwzLabs from './../components/dwz_labs';

import './dwz.css';

import DwzPost from './../../req/dwz'

export default class DwzShort extends React.Component {

	/**
	 * 短地址
	 * @author xwj 2020-07-15
	 */
	sUrl: string = '';
	/**
	 * 长地址
	 * @author xwj 2020-07-15
	 */
	tUrl: string = '';
	/**
	 * 进行网址还原定位
	 * @author xwj 2020-07-16
	 */
	toLong = () => {
		if (!this.sUrl) {
			notify.show('短网址不能为空', 'warning', 2000);
			return;
		}
		let sCode = this.sUrl;
		if (sCode.length !== 8) {
			// 基础逻辑判定，非8位长，不请求
			notify.show('您查询的短网址不存在', 'warning', 2000);
			this.tUrl = '';
			this.setState({
				tUrl: '',
			});
			return;
		}
		const params = {
			d: sCode,
		};
		DwzPost.info(params).then((res: any) => {
			if (res.data) {
				this.tUrl = res.data.tUrl;
				this.setState({
					tUrl: res.data.tUrl,
				});
			} else {
				notify.show('您输入的短网址不存在，请重新输入', 'warning', 2000);
				this.tUrl = '';
				this.setState({
					tUrl: '',
				});
			}
		});
	};
	/**
	 * 变更目标网址内容
	 * @author xwj 2020-07-15
	 * @param {Event} e 数据变更事件
	 */
	changeInput(e: React.ChangeEvent<HTMLInputElement>): void {
		this.sUrl = e.target.value;
		this.setState({
			sUrl: e.target.value
		})
	};
	/**
	 * 监听回车事件
	 * @author xwj 2020-07-15
	 * @param {Event} e 按键事件
	 */
	keyupInput(e: React.KeyboardEvent) {
		if (e.keyCode === 13) {
			// 回车，进行数据请求
			this.toLong();
		}
	}
	render() {
		let showShort: any = null;
		if (this.tUrl) { // 如果存在目标网址才显示
			showShort = (<div className="b_f_txt">原网址：<a data-testid="b_s_turl" href={this.tUrl} target="_blank" rel="noopener noreferrer">{this.tUrl}</a></div>);
		}
		return (
			<div className="dwz_root">
				<div className="d_body">
					<DwzLabs tar="info" />
					<div className="b_input">
						<input type="text" className="b_i_txt" onChange={(e) => this.changeInput(e)} onKeyUp={(e) => this.keyupInput(e)} placeholder="请直接输入后缀(如:xxx)"></input>
						<button data-testid="b_s_sub" onClick={() => this.toLong()}>还原网址</button>
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
