exports.zip2latlon = function(event) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var data = JSON.parse(this.responseText);
		if (data.status === 'OK') {
			event.latlng = data.results[0].geometry.location;
			Ti.App.fireEvent('latlng', event);
		} else {
		}
	};
	xhr.onerror = function() {
		console.log(this.error);
	};
	if (!event.postcode)
		event.postcode = event.city.value;
	var endpoint = 'http://maps.googleapis.com/maps/api/geocode/json?address=Germany+' + event.postcode + '&sensor=false';
	xhr.open('GET', endpoint);
	xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	xhr.send();
}
