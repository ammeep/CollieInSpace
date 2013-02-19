(function (game, vent){
	
	game.engine = (function(gameStage,enemies,player) {
												
				return (function() {				
					var self = this;					
					this.start = function(){
						collie.Renderer.start(1000 / 30, function() {
							var playerX = player.get('x');
							enemies.killEnemyAt(playerX);
							if(enemies.areDead()){
								collie.Renderer.stop();
								vent.publish('game-is-won')
							}						
						});
					};						
					return this;					
				})();
				
			});	
})(game,PubSub);
