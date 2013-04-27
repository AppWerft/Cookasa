// Function which create day view template
var dayView = function(e) {
	if (e.date)
		console.log(e.date);
	var label = Ti.UI.createLabel({
		current : e.current,
		width : '46dp',
		height : '44dp',
		backgroundColor : '#FFDCDCDF',
		text : e.day,
		date : e.date,
		textAlign : 'center',
		color : e.color,
		font : {
			fontSize : 20,
			fontWeight : 'bold',
			fontFamily : 'ZapfHumanist601BT-Roman'

		}
	});
	return label;
};

var monthName = function(e) {
	var months = 'Januar Februar März April Mai Juni Juli August September Oktober November Dezember';
	return months.split(' ')[e];
};

var formatDate = function(_y, _m, _d) {
	var y = _y;
	var m = parseInt(_m % 12 + 1);
	var d = _d;
	if (m < 10)
		m = '0' + m;
	if (d < 10)
		d = '0' + d;
	return (y + '-' + m + '-' + d);
}
// Calendar Main Function
exports.create = function(y, m, d) {
	var nameOfMonth = monthName(m);
	var self = Ti.UI.createView({
		layout : 'horizontal',
		width : '322dp',
		height : 'auto',
		top : '20dp'
	});
	var daysInMonth = 32 - new Date(y, m, 32).getDate();
	var dayOfMonth = new Date(y, m, d).getDate();
	var dayOfWeek = new Date(y, m, 1).getDay();
	var daysInLastMonth = 32 - new Date(y, m - 1, 32).getDate();
	var daysInNextMonth = (new Date(y, m, daysInMonth).getDay()) - 6;
	var dayNumber = daysInLastMonth - dayOfWeek + 1;
	for ( i = 0; i < dayOfWeek; i++) {
		self.add(new dayView({
			day : dayNumber,
			color : '#8e959f',
			current : 'no',
			dayOfMonth : ''
		}));
		dayNumber++;
	};

	// reset day number for current month
	dayNumber = 1;

	//get this month's days
	for ( i = 0; i < daysInMonth; i++) {
		var newDay = new dayView({
			day : dayNumber,
			color : '#3a4756',
			current : 'yes',
			dayOfMonth : dayOfMonth,
			date : formatDate(y, m, dayNumber)
		});
		self.add(newDay);
		if (newDay.text == dayOfMonth) {
			newDay.color = 'white';
			newDay.backgroundColor = '#FFFFF000';
			var oldDay = newDay;
		}
		dayNumber++;
	};
	dayNumber = 1;
	for ( i = 0; i > daysInNextMonth; i--) {
		self.add(new dayView({
			day : dayNumber,
			color : '#8e959f',
			current : 'no',
			dayOfMonth : ''
		}));
		dayNumber++;
	};
	self.addEventListener('click', function(e) {
		if (e.source.current == 'yes') {
			if (oldDay.text == dayOfMonth) {
				oldDay.color = 'white';
				oldDay.backgroundColor = 'red';
			} else {
				oldDay.color = '#3a4756';
				oldDay.backgroundColor = '#900'
			}
			oldDay.backgroundPaddingLeft = '0dp';
			oldDay.backgroundPaddingBottom = '0dp';
			if (e.source.text == dayOfMonth) {
				// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
				e.source.backgroundColor = '#FFFF00FF';
			} else {
				// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytile_selected.png';
				e.source.backgroundColor = '#FFFF0000';
			}
			e.source.backgroundPaddingLeft = '1dp';
			e.source.backgroundPaddingBottom = '1dp';
			e.source.color = 'white';
			//this day becomes old :(
			oldDay = e.source;
		}
	});
	return self;
}