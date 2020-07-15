import * as React from 'react';
import { Link } from 'react-router-dom';

export default class DwzLabs extends React.Component<DwzLabsProps> {
	/**
	 * lab数据列表
	 * @author xwj 2020-07-16
	 */
	labs: Array<LabInfo> = [
		{
			key: 'cre',
			text: '缩短网址',
		},
		{
			key: 'info',
			text: '还原网址',
		},
		{
			key: 'list',
			text: '短链列表',
		}
	];
	/**
	 * 被选中的lab
	 * @author xwj 2020-07-16
	 */
	selLab: string = '';
	constructor(props: DwzLabsProps) {
		super(props);
		this.selLab = props.tar || 'cre';
	}
	render() {
		let cont = [];
		for (let k in this.labs) {
			let lab: LabInfo = this.labs[k];
			if (lab.key === this.selLab) {
				cont.push(<div key={'lab_' + lab.key} className="b_t_lab b_act">{lab.text}</div>);
			} else {
				cont.push(<Link key={'lab_' + lab.key} to={'/' + lab.key} className="b_t_lab">{lab.text}</Link>);
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
/**
 * Lab信息
 * @author xwj 2020-07-16
 */
interface LabInfo {
	/**
	 * 匹配用key
	 * @author xwj 2020-07-16
	 */
	key: string,
	/**
	 * 显示用内容
	 * @author xwj 2020-07-16
	 */
	text: string,
}
/**
 * 被选中的lab
 * @author xwj 2020-07-16
 */
export interface DwzLabsProps {
	/**
	 * 目标标签：cre，创建短链；info，查询短链；list，查短链列表
	 * @author xwj 2020-07-16
	 */
	tar: string,
}