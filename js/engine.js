(function (game){
	
	game.engine = (function(gameStage,enemies,player) {
					
				
				function reset(){
					collie.Renderer.stop();
				}
				
				
				return (function() {
					
					var self = this;
					
					this.start = function(){
						collie.Renderer.start(1000 / 30, function() {
							var playerX = player.get('x');
							enemies.killEnemyAt(playerX);
							if(enemies.areDead()){
								reset();
								alert("you win!")
							}						
						});
					};
						
					return this;
					
				})();
				
			});
	
})(game);
