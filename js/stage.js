
var stage = (function(gameStage,layers,enemies,player) {
	
	function overlapedArea(a, b, d) {
			
	}
	
	$.each(layers,function(index,value){
			collie.Renderer.addLayer(value);
	});
	
	function loopOnce(){
		
			var playerX = player.get('x');
			enemies.killEnemyAt(playerX);
			if(enemies.areDead()){
				reset();
				alert("you win!")
			}

	};
	
	function reset(){
			collie.Renderer.stop();	
	}
	
	collie.Renderer.load(gameStage);
	
	return (function() {
		
		var self = this;
		
		this.start = function(){
			collie.Renderer.start(1000 / 30, function() {
				// check the player isnt dead or other objects arnt dead.
				//respond to movement given player position...	
				loopOnce()
			
			});
		};
		
		this.reset = function() {
			// reset layers and rabit and stuff.	
		
			
		
		};
		
				
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


