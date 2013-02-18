(function (game){
	
	game.engine = (function(gameStage,layers,enemies,player) {
					
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
				
				collie.Renderer.load(gameStage[0]);
				
				return (function() {
					
					var self = this;
					
					this.start = function(){
						collie.Renderer.start(1000 / 30, function() {
							// check the player isnt dead or other objects arnt dead.
							//respond to movement given player position...	
							loopOnce()
						
						});
					};
						
					return this;
					
				})();
				
			});
	
})(game);
