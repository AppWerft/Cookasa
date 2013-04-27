exports.create = function() {
	Ti.UI.iPhone.hideStatusBar();
	Ti.UI.backgroundColor = 'white';
	var TabBar = require('me.izen.tabbar');
	Ti.App.tabGroup = TabBar.createTabBar({
		tabBarColor : 'black',
		selectedImageTintColor : 'red'
	});
	/* Liste */
	var listTab = TabBar.createTab({
		icon : 'assets/259-list.png',
		title : 'Liste',
		accessibilityValue : 'Hier sind die Kukasa-Treffen gelistet',
		window : require('modules/window/eventswin').create('Cookasa-Liste')
	});
	listTab.addEventListener('click', function() {
		return false;
	})
	Ti.App.tabGroup.addTab(listTab);
	//	Ti.App.tabGroup.open();
	var mapTab = TabBar.createTab({
		icon : 'assets/243-globe.png',
		title : 'Karte',
		window : require('modules/window/mapwin').create('Cookasa-Karte')
	});
	Ti.App.tabGroup.addTab(mapTab);

	var rezeptTab = TabBar.createTab({
		icon : 'assets/255-box.png',
		title : 'Rezepte',
		window : require('modules/window/rezeptewin').create('Rezepte')
	});
	var eanTab = TabBar.createTab({
		icon : 'assets/195-barcode.png',
		title : 'Barcode',
		window : require('modules/window/eanwin').create('EAN-Code')
	});
	var chatTab = TabBar.createTab({
		icon : 'assets/icons/group.png',
		title : 'Chat',
		window : require('modules/window/chat').create('CookasaChat')
	});
	Ti.App.tabGroup.addTab(rezeptTab);
	Ti.App.tabGroup.addTab(eanTab);
	Ti.App.tabGroup.addTab(chatTab);

	Ti.App.addEventListener('userlogin', function() {
		var userTab = TabBar.createTab({
			icon : 'assets/253-person.png',
			title : 'myCookasa',
			accessibilityValue : 'Hier Deine Veranstaltungen gelistet. Du kannst Deine perönlichen Einstellungen bearbeiten',
			window : require('modules/window/mycookasawin').create()
		});
		Ti.App.tabGroup.addTab(userTab);
	});
	Ti.App.tabGroup.darker = Ti.UI.createView({
		backgroundColor : '#000000',
		opacity : 0.5,
		visible : false
	});
	Ti.App.tabGroup.add(Ti.App.tabGroup.darker);
	// open tab group

}
