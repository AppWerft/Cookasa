exports.create = function(set) {
	var self = Ti.UI.createTableViewRow({
		layout : 'vertical'
	});
	self.add(Ti.UI.createLabel({
		text : set.msg,
		left : 10
	}));
	self.add(Ti.UI.createLabel({
		text : set.src,
		textAlign : 'right',
		color : '#aaa',
		right: 10
	}));
	return self;
}
