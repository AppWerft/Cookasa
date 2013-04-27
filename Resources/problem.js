function Problem() {
	this.v = {x:null};
	return this;
}

Problem.prototype.setVal = function(x) {
	this.v.x = x;
}
Problem.prototype.getVal = function() {
	return this.v;
}
module.exports = Problem;
