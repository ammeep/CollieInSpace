(function(global, $, vent){
	
	global.game = {};
	
	global.game.dimensions = (function(){
		var isBackgroundSmall = document.body.clientWidth <= 640;		
		return { 
			scaleRatio : isBackgroundSmall ? 2 : 1,
			width : isBackgroundSmall ? 320 : 800,
			height: isBackgroundSmall ? 320 : 445
		};
	})();
	

	
	var collieTheExplorer = (function () {
  
	  	var gameStage;
		var gameContainer;
		  
	    function initialiseCollieImageManager(){
	        collie.ImageManager.add({
				rabbit:   "images/rabbit_walk.png",
				ground:   "images/ground.png",
				sky:	  "images/sky.png",
				cloud2:	  "images/cloud2.png",
				mountain: "images/mountain.png",
				mushroom: "images/mushroom.png"
			});
	    }
	
	    function initialiseGameCanvas(){
	       gameContainer = $('#container');
	       gameContainer.css('width', window.innerWidth + 'px');      
	       gameContainer.css('height', window.innerHeight + 'px');
	    }
	    
	    function initialiseGameObjects(){
	    	var layers;
	       layers = [background.layer(),ground.layer(),enemies.layer(),player.layer()];
	       gameStage = new game.stage(gameContainer,layers,enemies, player);
	    }
	    
	    return{
	        startGame: function(){
	            initialiseCollieImageManager();   
	            initialiseGameCanvas();    
	            initialiseGameObjects();
	            gameStage.start();         
	        }            
	    };
   
    })();
	
	$(document).ready(function () {
		collieTheExplorer.startGame();  
	});
	
})(window, jQuery, PubSub);
