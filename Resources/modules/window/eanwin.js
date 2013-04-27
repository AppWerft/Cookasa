exports.create = function(title) {
	Ti.Barcode = require('ti.barcode');
	var self = require('/modules/window/win').create(title);
	self.scanned = false;

	var search = Ti.UI.createSearchBar({
		barColor : '#000',
		showCancel : true,
		showBookmark : false,
		top : 0,

		hintText : 'Suche …'
	});
	self.add(search);
	self.dummy = Titanium.UI.createTableView({
		search : search,
		height : 50,
		top : 0,
		searchHidden : false,
	});
	self.tv = Ti.UI.createTableView({
		top : 50
	});
	self.tv.addEventListener('click', function() {
		search.blur();
	})
	self.add(self.tv);
	search.addEventListener('cancel', function() {
		search.blur();
	});
	self.addEventListener('focus', function(e) {
		if (self.scanned === true) {
			setTimeout(function() {
				self.scanned = false;
			}, 6000);
			return;
		}
		self.scanned = true;

		Ti.Barcode.allowRotation = false;
		Ti.Barcode.displayedMessage = '';
		Ti.Barcode.useLED = false;
		Ti.Barcode.capture({
			animate : false,
			showCancel : true,
			keepOpen : false
		});
		Ti.Barcode.addEventListener('success', function(_e) {
			var ean = _e.result;
			search.value = ean;
			require('modules/ean').search(ean, function(_e) {
				search.value = _e.fullname;
				search.blur();
			});
			Ti.Barcode.cancel();
		});
	});
	return self;
}
