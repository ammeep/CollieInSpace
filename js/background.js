(function (game){
	
	game.background = (function(dimensions){
	
						var backgroundLayer = new collie.Layer({
									width :  dimensions.width,
									height:  dimensions.Height
						});
						
						var oBackground = new collie.DisplayObject({
									width : dimensions.width,
									height : dimensions.height,
									y:-50,
									backgroundImage : "planetSky",
									backgroundRepeat : "repeat"
						}).addTo(backgroundLayer);
						
						var rocket = new collie.MovableObject({ // 90, 51
									x : 500 + dimensions.width,
									y : 20 / dimensions.scaleRatio,
									velocityX : -50,
									backgroundImage : "rocket",
									positionRepeat : true,
						}).addTo(backgroundLayer);		
					  
					  
						var oMountain = new collie.DisplayObject({
									x : 0,
									backgroundImage : "mountain"
						}).addTo(backgroundLayer).bottom(100);  
						  
						  
						return {	
							layer : function(){
									return backgroundLayer;
							}
								
						};
					})(game.dimensions);	
})(game);


