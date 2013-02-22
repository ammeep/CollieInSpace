(function(global, $, vent){
	
	global.game = {};
	
	global.game.dimensions = (function(){	
		return { 
			scaleRatio :  1,
			width : 800,
			height: 445
		};
	})();
	

	
	var collieTheExplorer = (function () {
  
	  	var gameEngine;
		var gameContainer;
		
		function initialiseCollieImageManager(){
	       collie.ImageManager.add({
				rabbit:   "game/images/rabbit_walk.png",
				ground:   "game/images/ground.png",
				sky:	  "game/images/sky.png",
				planetSky:"game/images/planetSky.png",
				rocket:   "game/images/rocket.png",
				cloud2:	  "game/images/cloud2.png",
				mushroom: "game/images/mushroom.png"
			});
	    }
	    vent.subscribe('game-is-won',function(){showWinnersScreen();}); 
		vent.subscribe('game-is-lost',function(){showGameOverScreen();}); 
		

		function showWinnersScreen(){
			$('.game-container').hide();
			$('.winning-screen').show();	
			$('.gameover-screen').hide();	
		}  
		
		function showGameOverScreen(){
			$('.game-container').hide();
			$('.winning-screen').hide();
			$('.gameover-screen').show();	
		}
		
		function showGame(){
			$('.game-container').show();
			$('.winning-screen').hide();
		    $('.gameover-screen').hide();		
		}

		 
		function initialiseGameCanvas(){
	       gameContainer = $('.game-container');
	       gameContainer.css('width', window.innerWidth + 'px');      
	       gameContainer.css('height', window.innerHeight + 'px');
	    }
	    
	    function initialiseGameObjects(){
	    	
	       var enemies = new game.enemies(game.dimensions);	
	       var layers = [game.background.layer(),game.ground.layer(), enemies.layer(),game.player.layer()];
	       
	       $.each(layers,function(index,value){
				collie.Renderer.addLayer(value);
		   });				
		   
		   collie.Renderer.load(gameContainer[0]);
	       gameEngine = new game.engine(gameContainer,enemies, game.player);
	    }
	    
	    return{
	    
	        startGame: function(){
	            initialiseCollieImageManager();   
	            initialiseGameCanvas();    
	            initialiseGameObjects();
	            showGame();
	            gameEngine.start();   
	        }            
	    };
   
    })();
    
    $(document).ready(function () {
	    collieTheExplorer.startGame();
	});
	
	
	
})(window, jQuery, PubSub);
