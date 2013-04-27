exports.create = function(_event) {
	var self = require('/modules/window/win').create(_event.title);
	self.container = Ti.UI.createScrollView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		contentHeight : Ti.UI.SIZE,
		contentWidth : Ti.UI.FILL,
		layout : 'vertical'
	});
	self.container.addEventListener('swipe', function(_e) {
		if (_e.direction == 'right')
			self.close({
				animated : true
			});
	});
	self.container.add(Ti.UI.createImageView({
		image : _event.image,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	}));
	self.container.add(Ti.UI.createLabel({
		text : _event.body.safe_value,
		top : 10,
		left : 10,
		font : {
			fontFamily : 'ZapfHumanist601BT-Roman'
		}
	}));
	Ti.DrupalProxy.get('views/dishes_of_an_event?display_id=services_dish_lists&args[0]=' + _event.event_id, function(results) {
		var scroller = Ti.UI.createScrollableView({
			height : 100,
			showPagingControl : true,
			top : 10,
			left : 10,
			right : 10,
			views : require('modules/widget/dishview').create(results)
		});
		self.container.add(scroller);
		scroller.addEventListener('click', function(_e) {
			if (_e.source.uid) {
				var userwin = require('modules/window/userwin').create(_e.source.uid);
				self.tab.open(userwin);
			}
		});
	});
	self.add(self.container);
	if (!Ti.DrupalProxy.getUser()) {
		require('/modules/mobidrup_logindialog').create(self, function(_user) {
			if (_user.name) {
				login.hide();
			}
		});
	}
	return self;
}
