exports.create = function(title) {
	var win = require('modules/window/win').create(title);
	var calbutton = Ti.UI.createButton({
		title : 'Kalender'
	});
	calbutton.addEventListener('click', function() {
		var calWindow = require('modules/window/calendarwin').create('Kalendar');
		win.tab.open(calWindow, {
			animated : true
		});
	});
	win.rightNavButton = calbutton;
	var rows = [];
	var table = Titanium.UI.createTableView({
		data : rows,
		height : Ti.UI.FILL
	});
	table.addEventListener('click', function(e) {
		win.tab.open(require('modules/window/eventwin').create(e.rowData.event), {
			animated : true
		});
	});
	win.add(table);
	function renderList() {
		Ti.DrupalProxy.get('event-lists', function(_results) {
			calbutton.events = _results;
			for (var i = 0; i < _results.length; i++) {
				var r = _results[i];
				require('modules/geo').zip2latlon(r);
				rows.push(require('modules/window/eventrow').create(r));
			}
			table.data = rows;
			Ti.App.fireEvent('eventsready');
		});
	}

	renderList();
	return win;
}
