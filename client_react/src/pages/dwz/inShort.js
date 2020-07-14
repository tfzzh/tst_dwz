import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';

import DwzLabs from './../components/dwz_labs';

import './dwz.css';

const { reqPost } = require('./../../req/dwz');

class DwzShort extends Component {

	state = {
		tUrl: '',
		sUrl: '',
	};
	/**
	 * 进行网址还原定位
	 * @author xwj 2020-07-12
	 */
	toLong = () => {
		console.log("in to short ["+this.state.sUrl+"] ... ");
		if (!this.state.sUrl) {
			notify.show('短网址不能为空', 'warning', 2000);
			return;
		}
		let sCode = this.state.sUrl;
		// let eInd = sCode.endsWith('/');
		// if (eInd !== false && eInd !== -1) {
		// 	sCode = sCode.substr(eInd + 1);
		// }
		if (sCode.length !== 8) {
			// 基础逻辑判定，非8位长，不请求
			notify.show('您查询的短网址不存在', 'warning', 2000);
			this.setState({
				tUrl: '',
			});
			return;
		}
		const params = {
			d: sCode,
		};
		let that = this;
		reqPost.info(params).then((res) => {
			console.log("info bak .. ", res);
			if (res.data) {
				that.setState({
					tUrl: res.data.tUrl,
				});
			} else {
				notify.show('您输入的短网址不存在，请重新输入', 'warning', 2000);
				that.setState({
					tUrl: '',
				});
			}
		});
	};
	/**
	 * 变更目标网址内容
	 * @author xwj 2020-07-12
	 * @param {Event} e 数据变更事件
	 */
	changeInput = (e) => {
		console.log("in keyupInput ["+e.keyCode+"]");
		this.setState({
			sUrl: e.target.value
		})
	};
	/**
	 * 监听回车事件
	 * @author xwj 2020-07-12
	 * @param {Event} e 按键事件
	 */
	keyupInput = (e) => {
		if (e.keyCode === 13) {
			// 回车，进行数据请求
			this.toLong();
		}
	}
	render() {
		let showShort = null;
		if (this.state.tUrl) { // 如果存在目标网址才显示
			showShort = (<div className="b_f_txt">原网址：<a data-testid="b_s_turl" href={this.state.tUrl} target="_blank" rel="noopener noreferrer">{this.state.tUrl}</a></div>);
		}
		return (
			<div className="dwz_root">
				<div className="d_body">
					<DwzLabs tar="info"/>
					<div className="b_input">
						<input type="text" className="b_i_txt" onChange={this.changeInput} onKeyUp={this.keyupInput} placeholder="请直接输入后缀(如:xxx)"></input>
						<button data-testid="b_s_sub" onClick={this.toLong}>还原网址</button>
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

export default DwzShort;
