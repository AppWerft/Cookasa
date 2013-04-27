exports.create = function(title) {
	var login = Ti.UI.createButton({
		title : 'Login'
	});
	login.addEventListener('click', function() {
		var win = require('/modules/login').create();
		Ti.App.tabGroup.activeTab.open(win);

	});
	var self = Ti.UI.createWindow({
		title : title,
	//	navBarHidden : true,
		barColor : 'red',
		backgroundColor : 'white'
	});
	self.addEventListener('close', function() {
		self = null
	});
	//self.rightNavButton = login;
	return self;
}
