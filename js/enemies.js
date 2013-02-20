(function (game){
	
	game.mushroom = (function(layer, initalX){

					var mushroom = new collie.MovableObject({	
						x: initalX,
						width: 82,
						height: 100,
					    zIndex: 2,
						backgroundImage: "mushroom",
						velocityX: 0,
					}).bottom(50).addTo(layer);
					
					var mushroomBounce = collie.Timer.cycle(mushroom, "11fps",{from:0, to: 5, loop:0});
					
					return{
						set : function (options) { mushroom.set(options); },						
						get : function (options) { return mushroom.get(options); },					
					};			
				});
				
	game.enemies = (function(dimensions){
					
					var enemyLayer = new collie.Layer({
						width: dimensions.width,
						height: dimensions.height
					});
					
					var getNextSpwanPoints = function(){
						var spawnPoints = [];
						for (var i=0;i<10;i++)
						{ 
							spawnPoints[i] = Math.floor((Math.random()*(dimensions.width * 3))+(dimensions.width + 30));
						}	
						return spawnPoints;
					};
					
					var aliveEnemies = [];
					
					$.each(getNextSpwanPoints(),function(index,value){
						aliveEnemies[index] = new game.mushroom(enemyLayer,value);
					});
					
					var startMovingEnemies = function(){			
						$.each(aliveEnemies,function(index,value){
							value.set({velocityX: -200});
						});
					};
					
					var stopMovingEnemies = function(){			
						$.each(aliveEnemies,function(index,value){
							value.set({velocityX: 0});
						});
					};
					
					var isAtPosition = function(enemy, xPosition){
						var mushroomX = enemy.get("x");
						var mushroomBufferZone = enemy.get("width") / 2;
						var farLeftMushroomBoundary = mushroomX - mushroomBufferZone;
						return xPosition >= farLeftMushroomBoundary;
					};
					
					var isBehindPosition = function(enemy, xPosition){
						return enemy.get('x') < xPosition;
					}
												
					PubSub.subscribe('playerMovingRight', function(){startMovingEnemies();});
					PubSub.subscribe('playerNotMoving'  , function(){stopMovingEnemies();});
				
					return {		
						layer : function(){
							return enemyLayer;
						},
						
						anyAtPosition: function(xPosition){
							for(var i = aliveEnemies.length; i--; i === 0){
								var enemy = aliveEnemies[i];
								if (isAtPosition(enemy, xPosition)){
									return true;
								}
							}
							return false;
						},
						
						allBehindPosition: function(xPosition){
							var allBehind = false;
							$.each(aliveEnemies,function(index,value){
								return isBehindPosition(value,xPosition);
							});	
							return allBehind;						
							}
							
					};
				});

})(game);
