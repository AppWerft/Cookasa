// Taking Screen Width
exports.create = function() {

	var win = require('/modules/window/win').create('');
	win.add(Ti.UI.createImageView({
		image : '/assets/bottomlogo.png',
		bottom : 0
	}));
	var screenWidth = 322;
	var needToChangeSize = false;

	var screenWidthActual = Ti.Platform.displayCaps.platformWidth;

	if (Ti.Platform.osname === 'android') {
		if (screenWidthActual >= 641) {
			screenWidth = screenWidthActual;
			needToChangeSize = true;
		}
	}
	var toolBar = Ti.UI.createView({
		top : '0dp',
		width : '322dp',
		height : '30dp',
		backgroundColor : '#FF0000',
		layout : 'vertical'
	});
	var toolBarDays = Ti.UI.createView({
		top : '2dp',
		width : '322dp',
		height : '22dp',
		layout : 'horizontal',
		left : '-1dp'
	});
	var days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
	for (var i = 0; i < days.length; i++) {
		toolBarDays[i] = Ti.UI.createLabel({
			left : '0dp',
			height : '20dp',
			text : days[i],
			width : '46dp',
			textAlign : 'center',
			font : {
				fontSize : 12,
				fontWeight : 'bold',
				fontFamily : 'ZapfHumanist601BT-Roman'
			},
			color : '#3a4756'
		});
		toolBarDays.add(toolBarDays[i]);
	}
	// Adding Tool Bar Title View & Tool Bar Days View
	toolBar.add(toolBarDays);
	monthName = function(e) {
		var months = 'Januar Februar März April Mai Juni Juli August September Oktober November Dezember';
		return months.split(' ')[e];
	};

	/* **************************************************** */
	var calendarView = require('modules/calendarview');
	var setDate = new Date();
	var y = setDate.getFullYear();
	var m = setDate.getMonth();
	var d = setDate.getDate();

	console.log('PrevMonth:');
	var prevCalendarView = (m === 0) ? calendarView.create(y - 1, 11, d) : calendarView.create(y, m - 1, d);
	prevCalendarView.left = (screenWidth * -1) + 'dp';

	console.log('ThisMonth:');
	var thisCalendarView = calendarView.create(y, m, d);

	console.log('NextMonth:');
	var nextCalendarView = (m === 11) ? calendarView.create(y + 1, 0, d) : calendarView.create(y, m + 1, d);
	nextCalendarView.left = screenWidth + 'dp';
	if (needToChangeSize === false) {
		thisCalendarView.left = '-1dp';
	}
	/* ****************************************** */

	win.title = monthName(m) + ' ' + y;
	win.add(toolBar);
	win.add(thisCalendarView);
	win.add(nextCalendarView);
	win.add(prevCalendarView);
	var slideNext = Ti.UI.createAnimation({
		// left : '-322',
		duration : 500
	});
	slideNext.left = (screenWidth * -1);
	var slideReset = Titanium.UI.createAnimation({
		duration : 500
	});
	if (needToChangeSize == false) {
		slideReset.left = '-1';
	} else {
		slideReset.left = ((screenWidth - 644) / 2);
	}
	var slidePrev = Titanium.UI.createAnimation({
		duration : 500
	});
	slidePrev.left = screenWidth;

	win.addEventListener('swipe', function(_e) {
		if (_e.direction == 'left') {
			if (m == 11) {
				m = 0;
				y++;
			} else {
				m++;
			}
			thisCalendarView.animate(slideNext);
			nextCalendarView.animate(slideReset);
			setTimeout(function() {
				thisCalendarView.left = (screenWidth * -1) + 'dp';
				if (needToChangeSize == false) {
					nextCalendarView.left = '-1dp';
				} else {
					nextCalendarView.left = ((screenWidth - 644) / 2);
				}
				prevCalendarView = thisCalendarView;
				thisCalendarView = nextCalendarView;
				if (m == 11) {
					nextCalendarView = calendarView.create(y + 1, 0, d);
				} else {
					nextCalendarView = calendarView.create(y, m + 1, d);
				}
				win.title = monthName(m) + ' ' + y;
				nextCalendarView.left = screenWidth + 'dp';
				win.add(nextCalendarView);
			}, 500);
		} else {
			if (m == 0) {
				m = 11;
				y--;
			} else {
				m--;
			}
			thisCalendarView.animate(slidePrev);
			prevCalendarView.animate(slideReset);
			setTimeout(function() {
				thisCalendarView.left = screenWidth + 'dp';
				if (needToChangeSize == false) {
					prevCalendarView.left = '-1dp';
				} else {
					prevCalendarView.left = ((screenWidth - 644) / 2);
				}
				nextCalendarView = thisCalendarView;
				thisCalendarView = prevCalendarView;
				if (m == 0) {
					prevCalendarView = calendarView.create(y - 1, 11, d);
				} else {
					prevCalendarView = calendarView.create(y, m - 1, d);
				}
				win.title = monthName(m) + ' ' + y;
				prevCalendarView.left = (screenWidth * -1) + 'dp';
				win.add(prevCalendarView);
			}, 500);
		}
	});
	return win;
}
