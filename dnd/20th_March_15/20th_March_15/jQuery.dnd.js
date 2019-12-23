(function($){
	$.fn.makeDraggable = function(options){
		var self = $(this) ; 
		var selfParent ; 
		var selfAndDocument = $(document);
		
		var params ={
			draggable:self,
			dragAxis: "both",
			setBehaviorConstrainedToBoundaryPanel : false,
			dragStart : function(){},
			dragMove : function(){},
			dragEnd : function(){}
		};
		params = $.extend(params,options);
		//console.log(params) ;
		

		$(this).each(function(){
			
			selfParent = $(this).parent();
			$(this).addClass("noselect");
			selfParent.css({position: "relative"});
			selfAndDocument.add(self);

			$(this).on("mousedown touchstart", function(e){
				self = $(this);
				params.draggable = $(this);
				moveDraggable(e, $(this), params);
				params.dragStart();
				$(this).css({zIndex:"9999"});
				
				$(document).on("mousemove touchmove", function(e){
					moveDraggable(e, self, params);
					params.dragMove();
					 e.preventDefault();
				});
				$(selfAndDocument).on("mouseup touchend", function(e){
					e.stopPropagation();
					e.preventDefault();
					$(this).unbind("mousemove touchmove mouseup touchend") ;
					selfAndDocument.remove(self);
					moveDraggable(e, self, params);
					params.dragEnd();
					self.css({"z-index":""});
				});
			});
		});

		

		function moveDraggable(eventObj, draggable, settings){
			selfParent = draggable.parent() ;
			var touchEvents = ['touchstart','touchmove','touchend'];
			var obj = {};
			if ( touchEvents.indexOf(eventObj.type) != -1 ) {
				if (eventObj.originalEvent && eventObj.originalEvent.targetTouches && eventObj.originalEvent.targetTouches[0]) {
					obj.x = eventObj.originalEvent.targetTouches[0].pageX - selfParent.offset().left - draggable.width()/2;
					obj.y = eventObj.originalEvent.targetTouches[0].pageY - selfParent.offset().top - draggable.height()/2;	
				}
			}else{
				obj.x = eventObj.pageX - selfParent.offset().left - draggable.width()/2;
				obj.y = eventObj.pageY - selfParent.offset().top - draggable.height()/2;
			}
			
			if(settings["dragAxis"].toLowerCase() == "x"){
				draggable.css({
					position: "absolute" ,
					left: obj.x + "px"
				});
				if(parseBool(settings["setBehaviorConstrainedToBoundaryPanel"])){
					if(draggable.position().left > draggable.parent().width() - draggable.width() ){
						draggable.css({
							left : draggable.parent().width() - draggable.width() + "px"
						}) ;
					}
					else if(draggable.position().left < 0 ){
						draggable.css({
							left : 0
						}) ;
					}
				}
				
			}
			else if(settings["dragAxis"].toLowerCase() == "y"){
				draggable.css({
					position: "absolute" ,
					top: obj.y + "px"
				});
				if(parseBool(settings["setBehaviorConstrainedToBoundaryPanel"])){
					if(draggable.position().top > draggable.parent().height() - draggable.height() ){
						draggable.css({
							top : draggable.parent().height() - draggable.height() + "px"
						}) ;
					}
					else if(draggable.position().top < 0 ){
						draggable.css({
							top : 0
						}) ;
					}
				}
				
			}else{
				draggable.css({
					position: "absolute" ,
					left: obj.x + "px" ,
					top: obj.y + "px"
				});	
			}
			
		}
		$.fn.makeDraggable.getDraggableWidget = function(){
			return self;
		}

		return $(this);
	};
})(jQuery);

function parseBool( str ){
	var boolmap = { 
		'no'    : false ,
		'NO'    : false ,
		'FALSE' : false ,
		'false' : false,
		'yes'   : true ,
		'YES'   : true ,
		'TRUE'  : true ,
		'true'  : true 
	};
	return ( str in boolmap && boolmap.hasOwnProperty(str)) ? 
	  boolmap[ str ] :  !!str ;
};


(function(){
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(needle) {
			for(var i = 0; i < this.length; i++) {
				if(this[i] === needle) {
					return i;
				}
			}
			return -1;
		};
	}
})();