

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

var player = (function(dimensions){
	
	
	var playerLayer = new collie.Layer({
		width: dimensions.width,
		height: dimensions.hight
	});
	
	var rabbit = new collie.DisplayObject({
		x: "center",
		width: 129.4,
		height: 165,
	    zIndex: 2,
		backgroundImage: "rabbit"
	}).bottom(50).addTo(playerLayer);
		  
	var defaultYPosition = rabbit.get('y');	  
		  	 
	rabbit.attach({
	  // make the rabbit jump when you click him	
	  click: function (e) {
	    collie.Timer.queue().
	      transition(rabbit, 400, {
	              to: rabbit.get('y') - 100,
	              effect: collie.Effect.easeOut,
	              set: "y"
	      }).
	      transition(rabbit, 400, {
	              to: defaultYPosition,
	              effect: collie.Effect.easeIn,
	              set: "y"
	      });
	  }
	});
	  
	var moveRabitRight = collie.Timer.cycle(rabbit, "18fps", {
			        from: 0,
					to: 8,
					loop: 1, 
					useAutoStart : false,
			        onStart : function () {
			         	PubSub.publish('playerMovingRight');
			        },
			        onComplete : function () {
			         	PubSub.publish('playerNotMoving');
			         }
	});		
	
	var jumpRabit = function(){
		rabbit.fireEvent('click');
	};

	$(document).keydown(function(e){
		var keyCode = e.keyCode || e.which,
	      	arrow = {left: 37, up: 38, right: 39, down: 40 };
	      	
		switch (keyCode) {
		    case arrow.left:
		   
		      break;
		    case arrow.up:     
		    	jumpRabit();
		    	break;
		    case arrow.right:
		     	moveRabitRight.start();
		      break;
		    case arrow.down:
		      //..possible crouching action
		      break;
		  }
	});

	return {		
		layer : function(){return playerLayer;},
		
		moveRight : function(){moveRabitRight();},
		
		jump : function(){jumpRabit();},
		
		
			
	};
})(game.dimensions);

var mushroom = (function(layer, initalX){

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
		set : function (options) { mushroom.set(options); }
	};

});


var enemies = (function(dimensions){
		
	var enemyLayer = new collie.Layer({
		width: dimensions.width,
		height: dimensions.height
	});
	
	var getNextSpwanPoints = function(){
		var spawnPoints = [];
		for (var i=0;i<10;i++)
		{ 
			spawnPoints[i] = Math.floor((Math.random()*(dimensions.width * 8))+(dimensions.width + 30));
		}	
		return spawnPoints;
	};
	
	var currentEnemies = [];
	
	$.each(getNextSpwanPoints(),function(index,value){
		currentEnemies[index] = new mushroom(enemyLayer,value);
	});
	
	var startMovingEnemies = function(){			
		$.each(currentEnemies,function(index,value){
			value.set({velocityX: -200});
		});
	};
	
	var stopMovingEnemies = function(){			
		$.each(currentEnemies,function(index,value){
			value.set({velocityX: 0});
		});
	};
		
	PubSub.subscribe('playerMovingRight', function(){startMovingEnemies();});
	PubSub.subscribe('playerNotMoving'  , function(){stopMovingEnemies();});

	return {		
		layer : function(){
			return enemyLayer;
		}
			
	};
})(game.dimensions);



