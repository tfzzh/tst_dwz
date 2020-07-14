import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DwzLabs extends Component {
	constructor(props) {
		super(props);
		// 设置 initial state
		this.state = {
			labs: {
				cre: '缩短网址',
				info: '还原网址',
				list: '短链列表',
			},
			sel: props.tar || 'cre'
		};
	}
	render() {
		let cont = [];
		for (let k in this.state.labs) {
			if (k === this.state.sel) {
				cont.push(<div key={'lab_'+k} className="b_t_lab b_act">{this.state.labs[k]}</div>);
			} else {
				cont.push(<Link key={'lab_'+k} to={'/' + k} className="b_t_lab">{this.state.labs[k]}</Link>);
			}
		}
		return (
			<div className="b_tit">
				<div className="b_t_bcol">
					{cont}
				</div>
			</div>
		);
	}
}

export default DwzLabs;
