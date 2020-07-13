import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';

import './dwz.css';

const { reqPost } = require('./../../req/dwz');

class DwzLong extends Component {

	state = {
		tUrl: '',
		sUrl: '',
	};
	/**
	 * 进行网址缩短操作
	 * @author xwj 2020-07-12
	 */
	toShort = () => {
		console.log("in to short ... ");
		if (!this.state.tUrl) {
			notify.show('长网址不能为空', 'warning', 2000);
			return;
		}
		const params = {
			t: this.state.tUrl
		};
		let that = this;
		reqPost.create(params).then((res) => {
			console.log("create bak .. ", res);
			that.setState({
				sUrl: res.data.sHost + res.data.sCode,
			});
		});
	};
	/**
	 * 变更目标网址内容
	 * @author xwj 2020-07-12
	 * @param {Event} e 数据变更事件
	 */
	changeInput = (e) => {
		console.log(e.target.value);    //获取修改后的值
		this.setState({
			tUrl: e.target.value
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
			this.toShort();
		}
	}
	render() {
		let showShort = null;
		if (this.state.sUrl) { // 如果存在目标短码才显示
			showShort = (<div className="b_f_txt">短网址：<a href={this.state.sUrl} target="_blank" rel="noopener noreferrer">{this.state.sUrl}</a></div>);
		}
		return (
			<div className="dwz_root">
				<div className="d_body">
					<div className="b_tit">
						<div className="b_t_bcol">
							<div className="b_t_lab b_act">缩短网址</div>
							<Link to="/info" className="b_t_lab">还原网址</Link>
							<Link to="/list" className="b_t_lab">短链列表</Link>
						</div>
					</div>
					<div className="b_input">
						<input type="text" className="b_i_txt" onChange={this.changeInput} onKeyUp={this.keyupInput}></input>
						<button onClick={this.toShort}>缩短网址</button>
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

export default DwzLong;
