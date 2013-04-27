exports.create = function(event) {
	var self = Ti.UI.createTableViewRow({
		hasChild : true,
		height : 60,
		event : event
	});
	var moment = require('modules/moment');
	var date = moment(event.date);
	event.datum = date.format("DD.MM.YYYY HH:mm");
	self.add(Ti.UI.createLabel({
		color : '#500',
		width : Ti.UI.FILL,
		left : 70,
		top : 5,
		height : 20,
		text : event.title,
		font : {
			fontWeight : 'bold',
			fontSize : 18,
			fontFamily : 'ZapfHumanist601BT-Roman'
		}
	}));
	self.add(Ti.UI.createLabel({
		color : '#500',
		width : Ti.UI.FILL,
		right : 10,
		textAlign : 'right',
		bottom : 5,
		height : Ti.UI.SIZE,
		text : event.datum + ' Uhr',
		font : {
			fontSize : 14,
			fontFamily : 'ZapfHumanist601BT-Roman'
		}
	}));
	self.add(Ti.UI.createImageView({
		width : 55,
		height : 55,
		left : 0,
		defaultImage : '/assets/icon.png',
		image : event.image_small
	}));
	return self;
}
