exports.create = function() {
	// Include the config.js file

	//Define the variable win to contain the current window
	var win = require('/modules/window/win').create('Posting');

	// Create a new button to have a cancel button
	var leftButton = Ti.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.DONE
	});

	// Create a new event listener for the leftButton
	leftButton.addEventListener("click", function() {
		// Just close this window
		win.close();
	});

	// We don't add the button to the window, instead, we tell the app
	// to set the button as the left navigation button
	win.setLeftNavButton(leftButton);
	var user = Ti.DrupalProxy.getUser();

	if (user || true) {

		// Create a new view "view" to hold the form
		var view = Ti.UI.createView({
			top : 0,
		});

		// Add the view to the window
		win.add(view);

		// Create the label for the node title
		var nodeTitleLabel = Titanium.UI.createLabel({
			text : 'Title',
			font : {
				fontSize : 14,
				fontWeight : "bold"
			},
			left : 10,
			top : 10,
			width : 300,
			height : 'auto',
			color : '#fff',
		});

		// Add the label to the window
		view.add(nodeTitleLabel);

		// Create the textfield to hold the node title
		var nodeTitleTextfield = Titanium.UI.createTextField({
			height : 35,
			top : 30,
			left : 10,
			width : 300,
			font : {
				fontSize : 16
			},
			borderWidth : 2,
			borderColor : '#bbb',
			borderRadius : 5,
			backgroundColor : '#fff',
		});

		// Add the textfield to the window
		view.add(nodeTitleTextfield);

		// Create the label for the node body
		var nodeBodyLabel = Titanium.UI.createLabel({
			text : 'Body',
			font : {
				fontSize : 14,
				fontWeight : "bold"
			},
			left : 10,
			top : 75,
			width : 300,
			height : 'auto',
			color : '#fff',
		});

		// Add the label to the window
		view.add(nodeBodyLabel);

		// Create the textarea to hold the body
		var nodeBodyTextarea = Titanium.UI.createTextArea({
			editable : true,
			value : '',
			height : 150,
			width : 300,
			top : 100,
			font : {
				fontSize : 16,
				fontWeight : 'normal'
			},
			color : '#888',
			textAlign : 'left',
			borderWidth : 2,
			borderColor : '#bbb',
			borderRadius : 5,
			// True = hit return and the textarea looses focus
			// False = hit return and the textarea enters an paragraph space
			suppressReturn : true,
		});

		// Add the textarea to the window
		view.add(nodeBodyTextarea);

		var imageButton = Ti.UI.createButton({
			title : "Image",
			height : 20,
			width : 100,
			font : {
				fontSize : 13,
			},
			top : 290
		});

		view.add(imageButton);

		var data_to_send = {};

		imageButton.addEventListener('click', function() {
			Ti.Media.showCamera({
				showControls : true,
				mediaTypes : Ti.Media.MEDIA_TYPE_PHOTO,
				autohide : true,
				allowEditing : true,
				success : function(event) {
					var image = event.media;
					var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'camera_photo.png');
					f.write(image);
					imageView.image = f.nativePath;
					data_to_send.file = f.read();
					data_to_send.name = 'camera_photo.png';
				},
				cancel : function() {
				},
				error : function(error) {
				}
			});
		});

		// Add the save button
		var saveButton = Titanium.UI.createButton({
			title : 'Save',
			height : 40,
			width : 200,
			top : 320,
			backgroundImage : '/assets/login/btn-active.png',
		});

		// Add the button to the window
		view.add(saveButton);

		// Add the event listener for when the button is created
		saveButton.addEventListener("click", function() {
			// Create a new node object
			var data = {
				node : {
					title : nodeTitleTextfield.value,
					type : 'article',
					body : {
						und : [{
							value : nodeBodyTextarea.value,
							format : 'full_html'
						}]
					}
					/*
					field_image: {
					und: [
					{ filename: data_to_send.file,
					filemime: 'image/png'
					}
					]
					},
					*/
					//					uid : user.uid,
				}
			};
			Ti.API.log('Start POSTING');
			Ti.App.MobiDrup.post('node', data, function(data) {
				alert("Content created with id " + data.nid);
				win.close();
			});
		});
	} else {
		alert("Erstmal einloggen  ;-)");
	}
	return win
}