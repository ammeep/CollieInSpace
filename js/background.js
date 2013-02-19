(function (game){
	
	game.background = (function(dimensions){
	
						var backgroundLayer = new collie.Layer({
								width :  dimensions.width,
								height:  dimensions.Height
						});
						
						var oBackground = new collie.DisplayObject({
									width : dimensions.width,
									height : dimensions.height,
									backgroundImage : "sky",
									backgroundRepeat : "repeat"
						}).addTo(backgroundLayer);
						
						
						var oCloud2 = new collie.MovableObject({ // 90, 51
									x : 330 / dimensions.scaleRatio,
									y : 20 / dimensions.scaleRatio,
									velocityX : -50,
									opacity : 0.8,
									backgroundImage : "cloud2",
									positionRepeat : true,
									rangeX : [-90, dimensions.width]
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


