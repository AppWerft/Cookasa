exports.create = function(e) {
	if (e.date)
		console.log(e.date);
	return label = Ti.UI.createLabel({
		current : e.current,
		width : '46dp',
		height : '44dp',
		backgroundColor : '#FFDCDCDF',
		text : e.day,
		date : e.date,
		textAlign : 'center',
		color : e.color,
		font : {
			fontSize : 20,
			fontWeight : 'bold',
			fontFamily : 'ZapfHumanist601BT-Roman'

		}
	});

};
