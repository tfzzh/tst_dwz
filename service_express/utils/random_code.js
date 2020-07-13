const rc = {
    /**
     * 随机排序的顺位串
     * @author xwj 2020-07-12
     */
    rStr: ['y','d','8','H','o','q','M','l','h','r','L','a','0','I','u','f','1','m','U','x','S','s','E','C','6','Y','g','9','O','4','n','t','Z','T','w','W','N','K','R','c','A','B','V','P','e','J','b','5','2','i','X','j','p','v','3','F','z','D','k','7','G','Q'],
    /**
     * 时间为基础的顺位串
     * 对内部算法不进行解释
     * @author xwj 2020-07-12
     * @param {number} length 目标字符串长度
     * @returns {string} 指定长度随机码
     */
    timeCode: (length)=> {
        let l1 = new Date().getTime();
        let ln = Math.floor(Math.random()*10);
        let l2 = parseInt(l1 + '' + ln);
        let y;
        let sb = '';
		do {
			y = l2 % rc.rStr.length;
            l2 = parseInt(l2 / rc.rStr.length);
            sb += rc.rStr[y];
			if (sb.length == length) {
				return sb;
			}
		} while (l2 > 0);
		while (sb.length < length) {
            let rn = Math.floor(Math.random()*rc.rStr.length);
			sb = rc.rStr[rn] + sb;
		}
		return sb;
    }
}

module.exports = {
    /**
     * 得到短码
     * @author xwj 2020-0712
     * @returns {string} 8位长随机码
     */
    shortCode:(len)=>{
        if (!len) {
            len = 8;
        }
        return rc.timeCode(len);
    }
};

