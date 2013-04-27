(function() {
	var idrupal = require('/modules/idrupal');
	Ti.DrupalProxy = new idrupal({
		RESTpath : 'http://cookasa.sreher.de/api/rest/'
	});
	Titanium.Barcode = Ti.Barcode = require('ti.barcode');
	require('modules/tabgroup').create();
	require('modules/window/introwin').createopen();
})();
