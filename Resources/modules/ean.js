exports.search = function(_ean, _callback) {
	var xhr = Ti.Network.createHTTPClient({
		timeout : 18000,
		onload : function() {
			if (xhr.status === 200) {
				var regex = /<TD ALIGN=RIGHT>(.*?)<TD>/m;
				regex.test(this.responseText.replace(/\n/gm, ''));
				var vals = RegExp.$1.replace(/[\s]+/g, ' ');
				var reg = new RegExp('<INPUT TYPE=HIDDEN NAME="(.*?)" VALUE="(.*?)">', 'g');
				var res;
				var ean = {};
				while (( res = reg.exec(vals)) !== null) {
					ean[res[1]] = res[2];
				}
				_callback(ean);
				return;
			} 
		},
		onerror : function() {
			_callback(null);
		}
	});
	xhr.open('POST', 'http://openean.kaufkauf.net/index.php');
	xhr.send({
		cmd : "ean1",
		SID : "",
		ean : _ean
	});
} 