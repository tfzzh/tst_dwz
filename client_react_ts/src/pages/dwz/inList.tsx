import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import 'antd/dist/antd.css'
import moment from 'moment'

import DwzLabs from './../components/dwz_labs';

import './dwz.css';

import DwzPost from './../../req/dwz'

export default class DwzList extends React.Component {
	/**
	 * 列表数据
	 * @author xwj 2020-07-16
	 */
	dataList: any = [];
	/**
	 * 分页数据
	 * @author xwj 2020-07-16
	 */
	page: PageInfo = {
		total: 0,
		page: 1,
		size: 5,
	};
	/**
	 * table所需表头及数据属性相关信息
	 * @author xwj 2020-07-16
	 */
	columns: ColumnProps<any>[] = [
		{
			title: '短code',
			dataIndex: 'd_url',
			key: 'd_url',
			width: '100px',
		},
		{
			title: '原地址',
			dataIndex: 'tar_url',
			key: 'tar_url',
			render: (text: any) => {
				return (<a href={text} target="_blank" rel="noopener noreferrer">{text}</a>)
			},
		},
		{
			title: '访问次数',
			dataIndex: 'call_times',
			key: 'call_times',
			width: '100px',
		},
		{
			title: '最后访问时间',
			dataIndex: 'last_call_time',
			key: 'last_call_time',
			width: '120px',
			render: (text: any) => {
				if (text === 0) {
					return '-';
				} else {
					return moment(text).format('YYYY-MM-DD HH:mm:ss');
				}
			}
		},
	];
	/**
	 * 组件变更页面事件
	 * @author xwj 2020-07-12
	 * @param {int} page 目标页面
	 * @param {int} totPage 总页面数
	 */
	changePage(page: number, size: number | undefined): void {
		this.pageData(page);
	};
	/**
	 * 进行网址缩短操作
	 * @author xwj 2020-07-12
	 * @param {int} p 目标页面
	 */
	pageData(page: number): void {
		const params = {
			p: page,
			s: this.page.size,
		}
		DwzPost.list(params).then((res: any) => {
			let tp = this.page;
			tp.page = params.p;
			tp.total = res.data.total - 0;
			this.dataList = res.data.list;
			this.setState({
				dataList: res.data.list,
				page: tp,
			});
		});
	};
	/**
	 * 页面初始化后处理的逻辑
	 * @author xwj 2020-07-16
	 */
	componentDidMount(): void {
		this.pageData(1);
	};
	render() {
		return (
			<div className="dwz_root">
				<div className="d_body d_table">
					<DwzLabs tar="list" />
					<div className="b_table">
						<Table columns={this.columns} dataSource={this.dataList} scroll={{ y: 420 }}
							pagination={{ current: this.page.page, pageSize: this.page.size, total: this.page.total, onChange: (page: number, size: number | undefined) => this.changePage(page, size), }} />
					</div>
				</div>
			</div>
		);
	}
}
/**
 * 分页信息
 * @author xwj 2020-07-16
 */
interface PageInfo {
	/**
	 * 总数据量
	 * @author xwj 2020-07-16
	 */
	total: number,
	/**
	 * 当前页数
	 * @author xwj 2020-07-16
	 */
	page: number,
	/**
	 * 页数据量
	 * @author xwj 2020-07-16
	 */
	size: number,
}
