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
		 
		function showStartText(){
			$('#container').html($('#startScreen').show());
			
		}  
		  
	    function initialiseCollieImageManager(){
	       collie.ImageManager.add({
				rabbit:   "images/rabbit_walk.png",
				ground:   "images/ground.png",
				sky:	  "images/sky.png",
				planetSky:"images/planetSky.jpg",
				rocket:   "images/rocket.png",
				cloud2:	  "images/cloud2.png",
				mushroom: "images/mushroom.png"
			});
	    }
	
	    function initialiseGameCanvas(){
	       gameContainer = $('#container');
	       gameContainer.css('width', window.innerWidth + 'px');      
	       gameContainer.css('height', window.innerHeight + 'px');
	    }
	    
	    function initialiseGameObjects(){
	    
	       var layers = [game.background.layer(),game.ground.layer(),game.enemies.layer(),game.player.layer()];
	       
	       $.each(layers,function(index,value){
				collie.Renderer.addLayer(value);
		   });				
		   
		   collie.Renderer.load(gameContainer[0]);
	       gameEngine = new game.engine(gameContainer,game.enemies, game.player);
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
	            $('#startScreen').hide();      
	        }            
	    };
   
    })();
	
	$(document).ready(function () {
		collieTheExplorer.showStartScreen();  
		$(document).keydown(function(e){
				var keyCode = e.keyCode || e.which;
			    if(keyCode == 13){
			    	collieTheExplorer.startGame();
			    }
		});
	});
	
})(window, jQuery, PubSub);
