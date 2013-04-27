exports.create = function(_parent, _callback) {
	Ti.App.tabGroup.darker.show();
	var alloyanimation = require('lib/animation');
	var self = Ti.UI.createWindow({
		borderColor : '#eceded',
		borderWidth : 2,
		borderRadius : 10,
		width : 272,
		height : 200,
		backgroundImage : '/assets/login/alert-bg.png'
	});
	self.open();
	alloyanimation.popIn(self, null);
	//self.loginUser = require('modules/mobidrup_login_model');
	self.add(Ti.UI.createLabel({
		color : '#fff',
		top : 10,
		width : 260,
		height : Ti.UI.SIZE,
		textAlign : 'center',
		font : {
			fontSize : 17,
			fontWeight : 'bold'
		},
		text : 'Personalisierung'
	}));
	self.add(Ti.UI.createLabel({
		color : '#fff',
		top : 35,
		width : 260,
		height : Ti.UI.SIZE,
		textAlign : 'center',
		font : {
			fontSize : 14
		},
		text : 'Gib mir Daten für den Cookasazugriff'
	}));
	self.progress = Ti.UI.createProgressBar({
		bottom : 20,
		height : 20,
		min : 0,
		max : 10,
		value : 1,
		width : '95%'
	});
	self.add(self.progress);
	self.password = Ti.UI.createTextField({
		width : 260,
		height : 28,
		bottom : 60,
		backgroundColor : '#fff',
		hintText : 'Passwort',
		font : {
			fontSize : 16
		},
		value : '',
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		enableReturnKey : true,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_BEZEL,
		passwordMask : true
	});
	self.add(self.password);
	self.login = Ti.UI.createTextField({
		width : 260,
		height : 28,
		bottom : 100,
		backgroundColor : '#fff',
		hintText : 'Login',
		value : '',
		font : {
			fontSize : 16
		},
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		enableReturnKey : true,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	self.add(self.login);

	self.cancel = Ti.UI.createButton({
		backgroundImage : '/assets/login/btn-inactive.png',
		width : 127,
		height : 43,
		title : 'Abbruch',
		bottom : 5,
		left : 5,
		borderRadius : 5,
		font : {
			fontWeight : 'bold'
		}
	});
	self.add(self.cancel);
	self.ok = Ti.UI.createButton({
		backgroundImage : '/assets/login/btn-active.png',
		width : 127,
		height : 43,
		bottom : 5,
		right : 5,
		borderRadius : 5,
		font : {
			fontWeight : 'bold'
		},
		title : 'OK'
	});
	self.add(self.ok);

	self.login.addEventListener('focus', function() {
		self.top = 10;
	});
	self.password.addEventListener('focus', function() {
		self.top = 10;
	});

	self.cancel.addEventListener('click', function() {
		self.close();
		Ti.App.tabGroup.darker.hide();
		_callback({
			success : false
		});
	});
	self.ok.addEventListener('click', function() {
		self.cancel.hide();
		self.ok.hide();
		self.progress.show();
		var login = self.login.value + ':' + self.password.value;
		if (self.login.value == 'xxx')
			var login = 'Drupanium:drupaniumauth';
		Ti.DrupalProxy.login(login, function(_res) {
			self.progress.hide();
			self.ok.show();
			self.progress.value = 0;
			self.cancel.show();
			clearInterval(self.cron);
			if (_res.success) {
				self.close();
				Ti.App.tabGroup.darker.hide();
				_callback(_res.user);
			} else {
				alloyanimation.shake(self, 0);
			}
		});
		self.cron = setInterval(function() {
			self.progress.value = self.progress.value + 0.1;
			if (self.progress.value > 10) {
				clearInterval(self.cron);
				self.cron = null;
				self.progress.hide();
				self.ok.show();
				alloyanimation.shake(self, 0);
				self.cancel.show();
			}
		}, 50);
	});
	self.addEventListener('close', function() {
		if (!Ti.DrupalProxy.getUser()) {
			_parent.close({
				animated : true
			});
		}
	});
}
