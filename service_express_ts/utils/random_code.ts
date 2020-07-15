
export class RandomCode {
	// 好吧，我大概是个单例
	static rc: RandomCode = new RandomCode();
	/**
	 * 随机排序的顺位串
	 * @author xwj 2020-07-15
	 */
	rStr: any = ['y', 'd', '8', 'H', 'o', 'q', 'M', 'l', 'h', 'r', 'L', 'a', '0', 'I', 'u', 'f', '1', 'm', 'U', 'x', 'S', 's', 'E', 'C', '6', 'Y', 'g', '9', 'O', '4', 'n', 't', 'Z', 'T', 'w', 'W', 'N', 'K', 'R', 'c', 'A', 'B', 'V', 'P', 'e', 'J', 'b', '5', '2', 'i', 'X', 'j', 'p', 'v', '3', 'F', 'z', 'D', 'k', '7', 'G', 'Q'];
	/**
	 * 时间为基础的顺位串
	 * 对内部算法不进行解释
	 * @author xwj 2020-07-15
	 * @param length 目标字符串长度
	 * @returns 指定长度随机码
	 */
	timeCode(length: number): string {
		let l1: number = new Date().getTime();
		let ln: number = Math.floor(Math.random() * 10);
		let l2: number = parseInt(l1 + '' + ln);
		let y: number = 0;
		let sb: string = '';
		do {
			y = l2 % this.rStr.length;
			l2 = parseInt((l2 / this.rStr.length) + '');
			sb += this.rStr[y];
			if (sb.length == length) {
				return sb;
			}
		} while (l2 > 0);
		while (sb.length < length) {
			let rn = Math.floor(Math.random() * this.rStr.length);
			sb = this.rStr[rn] + sb;
		}
		return sb;
	}

	/**
	 * 得到短码
	 * @author xwj 2020-07-15
	 * @param len 目标长度，如果不存在，则为8
	 * @returns len 指定长度的随机码
	 */
	static shortCode(len: number): string {
		return RandomCode.rc.timeCode(len);
	}
}