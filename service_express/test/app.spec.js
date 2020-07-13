let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('./../app');
const { assert } = require('chai');

let should = chai.should();
chai.use(chaiHttp);

const tst = {
	data: { // 必要的变量
		// dUrl: '', // 过程中相关的短地址
		// step: 0, // 步奏，1：请求详情；2：跳外链；3，得到列表；11，错误的详情；12，错误的外链；99：以上均完成
		// runStep: 0, // 正在进行的步骤
		// doneList: [],
		tot: 0,
		ove: 0,
	},
}



describe('all', () => {
	let tarUrl = 'www.sina.com.cn';
	let dUrl = 'l0AagbZo';
	let edUrl1 = '00000000';
	let edUrl2 = '000000';
	
	it('should create response', function(done){
		console.log(` \t\t ready should create [${tarUrl}] ... `);
		tst.data.tot++;
		let eTUrl = encodeURIComponent(tarUrl);
		let url = `/dwz/create?t=${eTUrl}`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.contain('"code":200');
				let fC200 = res.text.indexOf('"code":200');
				if (fC200 || fC200 !== 0) {
					let od = JSON.parse(res.text);
					dUrl = od.data.sCode;
				}
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	it('should create response err', function(done){
		console.log(` \t\t ready should create err ... `);
		tst.data.tot++;
		let url = `/dwz/create`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.contain('"code":311');
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	
	it('should info response', function(done){
		console.log(` \t\t ready should info [${dUrl}] ... `);
		tst.data.tot++;
		let url = `/dwz/info?d=${dUrl}`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.contain('"code":200');
				res.text.should.contain(tarUrl);
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	it('should info response err', function(done){
		console.log(` \t\t ready should info err ... `);
		tst.data.tot++;
		let url = `/dwz/info`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.contain('"code":312');
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	it('should info response err2', function(done){
		console.log(` \t\t ready should info err ... `);
		tst.data.tot++;
		let url = `/dwz/info?d=0000`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.contain('"code":200');
				res.text.should.not.contain('"data":');
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});

	it('should toTarUrl response', function(done){
		console.log(` \t\t ready should toTarUrl [${dUrl}] ... `);
		tst.data.tot++;
		// tst.data.doneList.push(done);
		let url = `/${dUrl}`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});

	it('should toTarErrUrl1 response', function(done){
		console.log(` \t\t ready should toTarErrUrl1 ... `);
		tst.data.tot++;
		// tst.data.doneList.push(done);
		let url = `/00000000`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(404);
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});


	it('should toTarErrUrl1 response', function(done){
		console.log(` \t\t ready should toTarErrUrl1 ... `);
		tst.data.tot++;
		let url = `/00000`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(404);
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});

	it('should list response 1', function(done){
		console.log(` \t\t ready should list ... `);
		tst.data.tot++;
		let url = `/dwz/list?p=1&s=7`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.contain('"code":200');
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	it('should list response 2', function(done){
		console.log(` \t\t ready should list 2 ... `);
		tst.data.tot++;
		let url = `/dwz/list?p=-1&s=3`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.contain('"code":200');
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	it('should list response 3', function(done){
		console.log(` \t\t ready should list 3 ... `);
		tst.data.tot++;
		let url = `/dwz/list?p=10&s=200`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.contain('"code":200');
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	it('should tst1 response ', function(done){
		console.log(` \t\t ready should tst1 ... `);
		tst.data.tot++;
		let url = `/dwz/tst/tst1`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.equal('in tst/tst1 ...');
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	it('should tst2 response ', function(done){
		console.log(` \t\t ready should tst2 ... `);
		tst.data.tot++;
		let url = `/dwz/tst/tst2`;
		chai.request(app)
			.get(url)
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.equal('in tst/tst2 ...');
				setTimeout(()=>{
					tst.data.ove++;
				}, 330);
				done();
			});
	});
	it('should random_code ', function(done){
		console.log(` \t\t ready should random_code ... `);
		tst.data.tot++;
		let rcObj = require('./../utils/random_code');
		let rc = rcObj.shortCode(15);
		rc.should.length(15);
		setTimeout(()=>{
			tst.data.ove++;
		}, 330);
		done();
	});
	setInterval(() => {
		if (tst.data.tot <= tst.data.ove) {
			console.log("over ["+tst.data.tot+"]["+tst.data.ove+"]");
			process.exit();
		}
	}, 300);
});

