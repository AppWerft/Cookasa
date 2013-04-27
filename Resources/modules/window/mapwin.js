// Taking Screen Width
exports.create = function() {
	var win = require('modules/window/win').create('Cookasa-Karte');
	var mapview = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		region : {
			latitude : 53.54511,
			longitude : 10.0,
			latitudeDelta : 2,
			longitudeDelta : 2
		},
		animate : true,
		regionFit : true,
		userLocation : true
	});
	win.add(mapview);
	Ti.App.addEventListener('latlng', function(e) {
		var pin = Titanium.Map.createAnnotation({
			latitude : e.latlng.lat,
			rightButton : Ti.UI.iPhone.SystemButton.DISCLOSURE,
			longitude : e.latlng.lng,
			title : e.title,
			subtitle : e.datum + ' Uhr',
			animate : true,
			event : e,
			image : '/assets/pin.png'
		});
		mapview.addAnnotation(pin);
	});
	mapview.addEventListener('click', function(e) {
		if (e.clicksource === 'rightButton') {
			var event = e.annotation.event;
			win.tab.open(require('modules/window/eventwin').create(event));
		}
	});
	return win;
}
