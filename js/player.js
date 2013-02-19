(function (game){
	
	game.player= (function(dimensions){
	
			var playerLayer = new collie.Layer({
				width: dimensions.width,
				height: dimensions.hight
			});
			
			var rabbit = new collie.DisplayObject({
				x: "center",
				width: 129.4,
				height: 165,
			    zIndex: 2,
				backgroundImage: "rabbit"
			}).bottom(50).addTo(playerLayer);
				  
			var defaultYPosition = rabbit.get('y');	  
				  	 
			rabbit.attach({
			  // make the rabbit jump when you click him	
			  click: function (e) {
			    collie.Timer.queue().
			      transition(rabbit, 400, {
			              to: rabbit.get('y') - 100,
			              effect: collie.Effect.easeOut,
			              set: "y"
			      }).
			      transition(rabbit, 400, {
			              to: defaultYPosition,
			              effect: collie.Effect.easeIn,
			              set: "y"
			      });
			  }
			});
			  
			var moveRabitRight = collie.Timer.cycle(rabbit, "18fps", {
					        from: 0,
							to: 8,
							loop: 1, 
							useAutoStart : false,
					        onStart : function () {
					         	PubSub.publish('playerMovingRight');
					        },
					        onComplete : function () {
					         	PubSub.publish('playerNotMoving');
					         }
			});		
			
			var jumpRabit = function(){
				rabbit.fireEvent('click');
			};
		
			$(document).keydown(function(e){
				var keyCode = e.keyCode || e.which,
			      	arrow = {left: 37, up: 38, right: 39, down: 40 };
			      	
				switch (keyCode) {
				    case arrow.left:
				   
				      break;
				    case arrow.up:     
				    	jumpRabit();
				    	break;
				    case arrow.right:
				     	moveRabitRight.start();
				      break;
				    case arrow.down:
				      //..possible crouching action
				      break;
				  }
			});
		
			return {		
				layer : function(){return playerLayer;},
				
				moveRight : function(){moveRabitRight();},
				
				jump : function(){jumpRabit();},
				
				get : function (options) { return rabbit.get(options); }
					
			};
		})(game.dimensions);

})(game);
