// Kosso
// Another attempt to create a simple Twitter client list.
// This time using a vertical layout view within each row containing the avatar image and labels for the
// date, the username and the tweet itself.
// @kosso : kosso@phreadz.com

Ti.include('modules/datelib.js');

exports.create = function() {
	// set up a twitter screen name.
	win = require('/modules/win').create('#cookasa');
	var button = Ti.UI.createButton({width:32,height:32,
		backgroundImage : '/assets/tw.png'

	});
	button.addEventListener('click', function() {
	});
	win.rightNavButton = button;
	// create table view data object
	var data = [];

	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 1000000;
	xhr.open("GET", "http://search.twitter.com/search.json?q=cookasa");
	xhr.onload = function() {
		try {
			var tweets = JSON.parse(this.responseText).results;
			for (var c = 0; c < tweets.length; c++) {
				var tweet = tweets[c].text;
				var user = tweets[c].from_user_name;
				var avatar = tweets[c].profile_image_url;
				var created_at = prettyDate(strtotime(tweets[c].created_at));
				var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
				var row = Ti.UI.createTableViewRow({
					hasChild : true,
					height : '120dp',
					backgroundColor : bgcolor
				});

				// Create a vertical layout view to hold all the info labels and images for each tweet
				var post_view = Ti.UI.createView({
					height : '120dp',
					layout : 'vertical',
					left : 5,
					top : 5,
					bottom : 5,
					right : 5,
				});

				var av = Ti.UI.createImageView({
					image : avatar,
					left : 0,
					top : 0,
					height : 48,
					width : 48
				});
				// Add the avatar image to the view
				post_view.add(av);

				var user_label = Ti.UI.createLabel({
					text : user,
					left : 54,
					width : 120,
					top : -48,
					bottom : 2,
					height : 18,
					textAlign : 'left',
					color : '#444444',
					font : {
						fontFamily : 'ZapfHumanist601BT-Roman',
						fontSize : 14,
						fontWeight : 'bold'
					}
				});
				// Add the username to the view
				post_view.add(user_label);

				var date_label = Ti.UI.createLabel({
					text : created_at,
					right : 0,
					top : -18,
					bottom : 2,
					height : 14,
					textAlign : 'right',
					width : 110,
					color : '#444444',
					font : {
						fontFamily : 'ZapfHumanist601BT-Roman',
						fontSize : 12
					}
				});
				// Add the date to the view
				post_view.add(date_label);

				var tweet_text = Ti.UI.createLabel({
					text : tweet,
					left : 54,
					top : 4,
					bottom : 2,
					height : 'auto',
					width : 230,
					textAlign : 'left',
					color : '#000',
					font : {
						fontSize : 16,
						fontFamily : 'ZapfHumanist601BT-Roman'
					}
				});
				// Add the tweet to the view
				post_view.add(tweet_text);
				// Add the vertical layout view to the row
				row.add(post_view);
				row.className = 'item' + c;
				data[c] = row;
			}
			// Create the tableView and add it to the window.
			var tableview = Titanium.UI.createTableView({
				data : data,
				minRowHeight : 58
			});
			//Ti.UI.currentWindow.add(tableview);
			win.add(tableview);
		} catch(E) {
			alert(E);
		}
	};

	win.addEventListener('focus', function() {
		// Get the data
		setTimeout(function() {
			xhr.send();
			console.log('REFRESH');
		}, 100);
	});
	return win;
};

