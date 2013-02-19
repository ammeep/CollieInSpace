

var background = (function(dimensions){
	
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

var ground = (function(dimensions){
		
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


