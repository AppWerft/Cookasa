exports.create = function(message) {
	var self = Ti.UI.createActivityIndicator({
		color : 'white',
		backgroundColor : 'black',
		borderRadius : 8,
		width : 240,
		height : 60,
		message : message,
		opacity : 0.9,
		zIndex : 999,
		font : {
			fontSize : 12
		},
		borderWidth : 2,
		borderColor : 'white'
	});
	return self;
}
