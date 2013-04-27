exports.create = function(recipe) {
	var self = require('/modules/window/win').create(recipe.content);
	var web = Ti.UI.createWebView({
		disableBounce : true,
		url : 'http://www.cuisine.at/recipes/recipe_set.php?id=' + recipe.id
	});
	self.add(web);
	web.addEventListener('load', function() {
		web.evalJS('');
	});
	return self;
}
