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
		 
		vent.subscribe('game-is-won',function(){showWinnersScreen();}); 
		vent.subscribe('game-is-lost',function(){showGameOverScreen();}); 
		
		function showStartText(){
			$('.splash-screen').show();
			$('.game-container').hide();
			$('.winning-screen').hide();	
			$('.gameover-screen').hide();	
	
		} 
		
		function showGame(){
			$('.splash-screen').hide();
			$('.game-container').show();
			$('.winning-screen').hide();
		    $('.gameover-screen').hide();		
		}
		
		function showWinnersScreen(){
			$('.splash-screen').hide();
			$('.game-container').hide();
			$('.winning-screen').show();	
			$('.gameover-screen').hide();	
		}  
		
		function showGameOverScreen(){
			$('.splash-screen').hide();
			$('.game-container').hide();
			$('.winning-screen').hide();
			$('.gameover-screen').show();	
		}
		  
	    function initialiseCollieImageManager(){
	       collie.ImageManager.add({
				rabbit:   "images/rabbit_walk.png",
				ground:   "images/ground.png",
				sky:	  "images/sky.png",
				planetSky:"images/planetSky.png",
				rocket:   "images/rocket.png",
				cloud2:	  "images/cloud2.png",
				mushroom: "images/mushroom.png"
			});
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
	    
	    	showStartScreen:function(){
		    	showStartText();
	    	},
	    	
	        startGame: function(){
	            initialiseCollieImageManager();   
	            initialiseGameCanvas();    
	            initialiseGameObjects();
	            gameEngine.start();   
	            showGame();    
	        }            
	    };
   
    })();
	
	$(document).ready(function () {
		collieTheExplorer.showStartScreen();
		$(document).on('keydown', function(e){
			var keyCode = e.keyCode || e.which;
		    if(keyCode == 13){
		    	$(this).off(e);
		    	collieTheExplorer.startGame();
		    }
		});
	});
	
})(window, jQuery, PubSub);
