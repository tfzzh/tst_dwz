import React, { Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css'
import moment from 'moment'

import DwzLabs from './../components/dwz_labs';

import './dwz.css';

const { reqPost } = require('./../../req/dwz');

class DwzList extends Component {

	state = {
		list: [],
		page: {
			t: 0,
			p: 1,
			s: 5,
		},
	};
	// table所需表头及数据属性相关信息
	columns = [
		{
			title: '短code',
			dataIndex: 'd_url',
			key: 'd_url',
			width: '100px',
			render: text => <font>{text}</font>,
		},
		{
			title: '原地址',
			dataIndex: 'tar_url',
			key: 'tar_url',
			render: text => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
		},
		{
			title: '访问次数',
			dataIndex: 'call_times',
			key: 'call_times',
			width: '100px',
			render: text => <font>{text}</font>,
		},
		{
			title: '最后访问时间',
			dataIndex: 'last_call_time',
			key: 'last_call_time',
			width: '120px',
			render: text => {
				let cont = null;
				if (text === 0) {
					cont = <font>-</font>
				} else {
					cont = <font>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</font>
				}
				return (
					cont
				)
			},
		},
	];
	/**
	 * 组件变更页面事件
	 * @author xwj 2020-07-12
	 * @param {int} page 目标页面
	 * @param {int} totPage 总页面数
	 */
	changePage = (page, totPage) => {
		this.pageData(page);
	};
	/**
	 * 进行网址缩短操作
	 * @author xwj 2020-07-12
	 * @param {int} p 目标页面
	 */
	pageData = (p) => {
		const params = {
			p: p,
			s: this.state.page.pageSize,
		}
		let that = this;
		reqPost.list(params).then((res) => {
			let tp = that.state.page;
			tp.p = params.p;
			tp.t = res.data.total - 0;
			that.setState({
				list: res.data.list,
				page: tp,
			});
		});
	};
	/**
	 * 页面初始化后处理的逻辑
	 */
	componentDidMount() {
		this.pageData(1);
	};
	render() {
		return (
			<div className="dwz_root">
				<div className="d_body d_table">
					<DwzLabs tar="list"/>
					<div className="b_table">
						<Table columns={this.columns} dataSource={this.state.list} scroll={{ y: 420 }}
							pagination={{ page: this.state.page.p, current: this.state.page.p, pageSize: this.state.page.s, total: this.state.page.t, onChange: this.changePage, }} />
					</div>
				</div>
			</div>
		);
	}
}

export default DwzList;
