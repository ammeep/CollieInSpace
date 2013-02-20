(function (game, vent){
	
	game.engine = (function(gameStage,enemies,player) {
												
				return (function() {				
					var self = this;					
					this.start = function(){
						collie.Renderer.start(1000 / 30, function() {
							var playerX = player.get('x');
							if(enemies.anyAtPosition(playerX)){
							    collie.Renderer.stop();
								vent.publish('game-is-lost');
							}
							if(enemies.allBehindPosition(playerX)){
								collie.Renderer.stop();
								vent.publish('game-is-won');
							}						
						});
					};						
					return this;					
				})();
				
			});	
})(game,PubSub);
