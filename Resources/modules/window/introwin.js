exports.createopen = function() {
	Ti.UI.iPhone.hideStatusBar();
	var self = Ti.UI.createWindow({
		height : Ti.UI.FILL
	});

	//Adding indicator to your window

	self.add(Ti.UI.createImageView({
		image : '/assets/Default.png',
		bottom : 0
	}));
	Titanium.UI.iPhone.hideStatusBar();
	self.open();
	var intro = Ti.UI.createImageView({
		image : '/assets/intro.png',
		width : 280,
		opacity : 0.01,
		bottom : '25%',
		height : Ti.UI.SIZE
	});

	self.addEventListener('click', function() {
		self.close({
			animated : true
		})
	});
	self.addEventListener('close', function() {
		self = null;
	});
	intro.animate(Ti.UI.createAnimation({
		opacity : 1,
		duration : 4000
	}));

	self.add(intro);
	var progress = require('com.midhun.progress');
	//your window
	var hud = progress.createHUD({
		color : "transparent",
		width : '90%',
		height : '15%',
		bottom : 10,
		borderRadius : 10,
		text : "Warte auf aktuelle Daten",
		type : "MMP_Type2",
	});
	//creating Activity Indicator
	self.add(hud);
	Ti.App.addEventListener('eventsready', function() {
		self.close({
			transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,
			duration : 700
		});
		Ti.App.tabGroup.open();
		Ti.UI.iPhone.showStatusBar();
	}, 500);
};
