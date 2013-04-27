function iDrupal(_options) {
	Ti.App.Properties.removeProperty('USER');
	this.RESTpath = _options.RESTpath;
	this.USER = {
		credentials : null,
		user : null
	};
	/*require('modules/uhhlogin').tryall('Bad4846:Münster2008', function(_e) {
		console.log(_e);
	});
/*	
 //this.STiNElogin('Bad4846:Münster2008');
	require('modules/uhhlogin').tryall('f6sv005:*MHpsNH', function(_e) {
		console.log(_e);
	});
	require('modules/uhhlogin').netstorage('f6sv005:* MHpsNH', function(_e) {
		console.log(_e);
	});*/
	return this;
}

iDrupal.prototype.getUser = function() {
	return Ti.App.Properties.hasProperty('USER') ? JSON.parse(Ti.App.Properties.getString('USER')).user : null;
}

iDrupal.prototype.login = function(_user, _callback) {
	/* extracting of user from dialog */
	if ( typeof (_user) == 'string') {
		var credentials = {
			username : _user.split(':')[0],
			password : _user.split(':')[1]
		};
	} else if ( typeof (_user) == 'object') {
		var credentials = _user;
	}
	/* */

	this.USER.credentials = credentials;
	this.credentials = credentials;

	var url = this.RESTpath + 'user/login' + '.json';
	var that = this;
	var xhr = Ti.Network.createHTTPClient({
		timeout : 15000
	});
	xhr.clearCookies(this.RESTpath);
	xhr.onerror = function(_e) {
		_callback({
			success : false
		});
	};
	xhr.onload = function() {
		if (this.status == 200) {
			var user = JSON.parse(this.responseText).user;
			that.USER.user = user;
			Ti.App.Properties.setString('USER', JSON.stringify(that.USER));
			Ti.App.fireEvent('userlogin', {
				user : user
			});
			_callback({
				user : user,
				success : true
			});
		} else
			_callback({
				success : false
			});
	}
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	xhr.setRequestHeader("User-Agent", "Cookasa 1.0");
	xhr.send(JSON.stringify(this.USER.credentials));
}

iDrupal.prototype.get = function(action, onSuccess) {
	this.Proxy(action, {}, 'GET', onSuccess);
}
iDrupal.prototype.del = function(action, onSuccess) {
	this.Proxy(action, {}, 'DELETE', onSuccess);
}
iDrupal.prototype.put = function(action, data, onSuccess) {
	this.Proxy(action, data, 'PUT', onSuccess);
}
iDrupal.prototype.post = function(action, data, onSuccess) {
	this.Proxy(action, data, 'POST', onSuccess);
}

iDrupal.prototype.Proxy = function(action, data, method, onSuccess) {
	var self = this;
	var xhr = Ti.Network.createHTTPClient({
		timeout : 25000
	});
	xhr.onload = function() {
		var data = JSON.parse(this.responseText);
		onSuccess(data);
	}
	xhr.onerror = function(_e) {
		switch (this.status) {
			case 401:
				require('/modules/mobidrup_logindialog').create(self.RESTpath, function(_res) {
				});
				break;
			case 406:
				require('/modules/mobidrup_logindialog').create(self.RESTpath, function(_res) {
				});
				break;
		}
		//	Ti.API.log(this.responseText);
		/*require('/modules/login').create(function(e) {
		 Ti.API.log(e);
		 });
		 */
	}
	var endpoint = this.RESTpath + action + '.json?_=' + Math.random();
	xhr.open(method, endpoint);
	console.log(endpoint);
	xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	var ua = Ti.App.name + ' ' + Ti.App.version;
	if (this.user)
		ua += (' (' + this.user.name + ')');
	xhr.setRequestHeader("User-Agent", ua);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send((method == 'GET' || method == 'DELETE' || data == null) ? null : JSON.stringify(data));
}

module.exports = iDrupal;
