exports.create = function(dishes) {
	var views = [];
	for (var i = 0; i < dishes.length; i++) {
		views[i] = Ti.UI.createView({

		});
		views[i].add(Ti.UI.createImageView({
			left : 0,
			height : Ti.UI.FILL,
			uid : dishes[i].cook_uid,
			width : Ti.UI.SIZE,
			image : dishes[i].cook_picture
		}));
		var container = Ti.UI.createView({
			left : 80,
			layout : 'vertical'
		});
		views[i].add(container);
		container.add(Ti.UI.createLabel({
			text : dishes[i].dish_description,
			top : 10,
			left : 0,
			right : 10,
			font : {
				fontFamily : 'ZapfHumanist601BT_Roman'
			}
		}));

	}
	return views;
}
