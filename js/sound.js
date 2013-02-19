(function (game){
	
	game.sound = (function() {

				soundManager.setup({
					  url: '../sound',
					  preferFlash: false ,
					  onready: function() {
						   var mySound = soundManager.createSound({
						      id: 'music',
						      url: '../sound/music.mp3'
						    });
						    mySound.play();
					  }
					  
				});
			})();	
})(game);
