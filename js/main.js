(function(global, $, vent){
	
	global.game = {};
	
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
	       gameStage = new stage(gameContainer,layers,enemies, player);
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
