(function (game){
	
	game.ground = (function(dimensions){
					
					var groundLayer = new collie.Layer({
						width: dimensions.width,
						height: dimensions.height
					});
						
					PubSub.subscribe('playerMovingRight', function(){ground.set({velocityX : -200});});
					PubSub.subscribe('playerNotMoving'  , function(){ground.set({velocityX : 0}); });
				
					var ground = new collie.MovableObject({
						x: 0,
						width: dimensions.width * 2,
						height: 88,
					    velocityX: 0,
						backgroundImage: "ground",
						backgroundRepeat: "repeat-x",
						rangeX: [-320, 0],
						positionRepeat: true
					}).bottom(0).addTo(groundLayer);
					
					
					return {
						
						startGroundMoving: function(){console.log('e')},
						
						layer : function(){
							return groundLayer;
						}
							
					};
				})(game.dimensions);
	
})(game);
