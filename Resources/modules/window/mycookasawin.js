exports.create = function(_uid) {
	var self = require('modules/window/win').create('');

	var dashboardData = [];
	var itemData = [{
		name : 'Koch',
		badge : 10,
		icon : '/assets/icons/icon_cook.png'
	}, {
		name : 'Gastgeber',
		badge : 2,
		icon : '/assets/icons/icon_host.png'
	}, {
		name : 'Manager',
		badge : 2,
		icon : '/assets/icons/icon_notepad.png'
	}];

	for (var i = 0, ilen = itemData.length; i < ilen; i++) {
		var item = Ti.UI.createDashboardItem({
			badge : itemData[i].badge,
			image : itemData[i].icon,
			label : itemData[i].name
		});
		dashboardData.push(item);
	}

	var dashboard = Ti.UI.createDashboardView({
		data : dashboardData,
		wobble : true,
		backgroundImage : '/assets/dishes.jpg',
		top : 0,
		height : 100
	});
	self.add(dashboard);
	function updateSection(_sections, _sectiondata) {
		var sectionView = Ti.UI.createTableViewSection({
			headerTitle : _sectiondata.title
		});
		_sections.push(sectionView);
		if (_sectiondata.endpoint) {
			Ti.DrupalProxy.get(_sectiondata.endpoint, function(_results) {

				for (var i = 0; i < _results.length; i++) {
					sectionView.add(require('modules/window/eventrow').create(_results[i]));
				}
				self.container.setData(_sections);
			});
		}
		self.container.setData(_sections);
	}
	self.container = Ti.UI.createTableView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		top : 100
	});
	self.addEventListener('focus', function() {
		var user = Ti.DrupalProxy.getUser();
		self.title = user.name;
		var sectionnames = [{
			title : 'erledigte Kochtreffen',
			endpoint : 'views/my_event_list?display_id=services_my_past_events&args[0]=1'
		}, {
			title : 'gebuchte Kochtreffen',
			endpoint : 'views/my_event_list?display_id=services_my_upcoming_events&args[0]=1'
		}, {
			title : 'abgesagte Kochtreffen'
		}];
		sections = [];
		for (var i = 0; i < sectionnames.length; i++) {
			updateSection(sections, sectionnames[i]);
		}
		self.container.setData(sections);
	});
	self.add(self.container);
	self.container.addEventListener('click', function(e) {
		self.tab.open(require('/modules/window/eventwin').create(e.rowData.event), {
			animated : true
		});
	});
	return self;
}
