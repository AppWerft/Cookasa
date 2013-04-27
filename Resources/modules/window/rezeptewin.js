exports.create = function() {
	var self = require('/modules/window/win').create('Rezeptsuche');
	var search = Ti.UI.createSearchBar({
		barColor : '#000',
		showCancel : true,
		showBookmark : false,
		top : 0,

		hintText : 'Suche …'
	});
	self.dummy = Titanium.UI.createTableView({
		search : search,
		height : 50,
		top : 0,
		searchHidden : false,
	});
	self.tv = Ti.UI.createTableView({
		top : 50,
		height : Ti.UI.FILL
	});
	require('modules/ean').search('4000446001018', function() {
	});
	search.addEventListener('blur', function(_e) {
		var yql = 'SELECT * FROM xml WHERE url="http://www.cuisine.at/ajax/gettitlepreview.php?ti=' + _e.source.value + '&ln=D"';
		Titanium.Yahoo.yql(yql, function(y) {
			var recipes = y.data.searchresult.recipes.recipe;
			var rows = [];
			for (var i = 0; i < recipes.length; i++) {
				var recipe = recipes[i];
				var row = Ti.UI.createTableViewRow({
					hasChild : true,
					recipe : recipe,
					height : Ti.UI.SIZE
				});
				row.add(Ti.UI.createLabel({
					text : recipes[i].content,
					left : 10,
					left : 10,
					height : Ti.UI.SIZE,
					top : 5,
					bottom : 5,
					font : {
						fontSize : 20,
						fontFamily : 'ZapfHumanist601BT-Roman'
					}
				}));
				rows.push(row);
			}
			self.tv.data = rows;
		});
	});
	self.add(self.dummy);
	self.add(self.tv);
	self.tv.addEventListener('click', function(_e) {
		var win = require('/modules/window/rezeptwin').create(_e.row.recipe);
		self.tab.open(win);
	});
	
	return self;
}
