var URI = 'ws://lab.min.uni-hamburg.de:8080';

exports.create = function(title) {
	var self = require('/modules/window/win').create(title);
	function showMessage(text) {
		if (!self.actind) {
			self.actind = require('modules/widget/actind').create(text);
		}
		self.actind.setMessage(text);
		self.actind.show();
		setTimeout(function() {
			self.actind.hide();
		}, 2000)
	}

	var input = Ti.UI.createTextField({
		top : 0,
		width : Ti.UI.FILL,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		textAlign : 'left',
		height : 45,
		hintText : 'Dein Chatbeitrag',
		clearOnedit : true,
		enableReturnKey : false,
	});

	self.add(input);
	var output = Ti.UI.createTableView({
		top : 45
	});
	self.add(output);
	self.websocket = require('net.iamyellow.tiws').createWS();
	self.websocket.open(URI);
	showMessage('Open connection');
	self.websocket.addEventListener('open', function() {
		Ti.API.debug('websocket opened');
	});
	self.websocket.addEventListener('close', function(ev) {
		Ti.API.info(ev);
	});
	self.websocket.addEventListener('error', function(ev) {
		Ti.API.error(ev);
	});
	self.websocket.addEventListener('message', function(ev) {
		try {
			var msg = JSON.parse(ev.data);
			console.log(msg);
			output.appendRow(require('modules/widget/chatrow').create(msg));
		} catch(E) {
		}
	});
	input.addEventListener('return', function() {
		self.websocket.open(URI);
		var val = input.getValue();
		self.websocket.send(JSON.stringify({
			msg : val,
			src : Ti.Platform.username
		}));
		output.appendRow(require('modules/widget/chatrow').create({
			msg : val,
			src : 'ICH'
		}));
		input.setValue('');
		output.scrollToIndex(output.data[0].rows.length);
	});
	self.actind = require('modules/widget/actind').create('Lade …');
	self.add(self.actind);
	Ti.App.addEventListener('resume', function() {
		//if (!self.websocket) {
		showMessage('Reopen connection after resuming');
		self.websocket.open(URI);
		//}
	});
	return self;
}
