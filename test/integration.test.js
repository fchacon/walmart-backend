const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const url = "http://localhost:3000";
const expect = require("chai").expect;
const server = require("../server");

describe("/GET products", () => {
	it("should get all products", (done) => {
		chai.request(url)
			.get("/products")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("total");
				expect(res.body.data.length).to.be.equal(3000);
				expect(res.body.total).to.be.equal(3000);
				done();
			});
	});

	it("should get one product with no discount", (done) => {
		chai.request(url)
			.get("/products?text=12")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("total");
				expect(res.body.data.length).to.be.equal(1);
				expect(res.body.data[0].discount).to.be.equal(0);
				expect(res.body.total).to.be.equal(1);
				done();
			});
	});

	it("should get one product with 50% discount", (done) => {
		chai.request(url)
			.get("/products?text=101")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("total");
				expect(res.body.data.length).to.be.equal(1);
				expect(res.body.data[0].discount).to.be.equal(50);
				expect(res.body.total).to.be.equal(1);
				done();
			});
	});

	it("should get several products with 50% discount", (done) => {
		chai.request(url)
			.get("/products?text=nvn&page=1&perPage=10")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("total");
				expect(res.body.data.length).to.be.lessThan(11);

				for (let i = 0; i < res.body.data.length; i++) {
					expect(res.body.data[i].discount).to.be.equal(50);
				}

				done();
			});
	});

	it("should get several products with no discount", (done) => {
		chai.request(url)
			.get("/products?text=ooy&page=1&perPage=10")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("total");
				expect(res.body.data.length).to.be.lessThan(11);

				for (let i = 0; i < res.body.data.length; i++) {
					expect(res.body.data[i].discount).to.be.equal(0);
				}

				done();
			});
	});
});
