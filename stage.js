
var stage = (function(gameStage,layers) {
	
	function overlapedArea(a, b, d) {
			
	}
	
	$.each(layers,function(index,value){
			collie.Renderer.addLayer(value);
	});
	

	
	collie.Renderer.load(gameStage);
	
	return (function() {
		
		var self = this;
		
		this.start = function(){
			this.reset();
		};
		
		this.reset = function() {
			// reset layers and rabit and stuff.			
			return self;		
		};
		
		collie.Renderer.start(1000 / 30, function() {
			// check the player isnt dead or other objects arnt dead.
			//respond to movement given player position...	
		});
		
		return this;
		
	}).call({});
	
});

game = {};

game.dimensions = (function(){

	var isBackgroundSmall = document.body.clientWidth <= 640;
	
	return { 
		scaleRatio : isBackgroundSmall ? 2 : 1,
		width : isBackgroundSmall ? 320 : 800,
		height: isBackgroundSmall ? 320 : 445
	};
})();

