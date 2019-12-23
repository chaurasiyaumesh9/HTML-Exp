/*
	transition - http://ricostacruz.com/jquery.transit/
*/
function M0201att(entryPointClassObj,displayText,index){
	var M0201att_selfObj = this;
	this.entryPointClassObj = entryPointClassObj;
	this.hitIndex = -1;
	var libraryObj = new Library();
	this.draggable = libraryObj.createElement("div") ;
	this.draggable.appendTo(entryPointClassObj.draggableHolder);
	
	this.cssdraggable = {};
	this.cssdraggable["border"] = "2px none #a7a7a7";
	this.cssdraggable["float"] = "left";
	//this.cssdraggable["display"] = "table-cell";
	this.cssdraggable["cursor"] = "pointer";
	this.cssdraggable["border-radius"] = "5px";
	this.cssdraggable["margin"] = "5px";
	this.cssdraggable["background"] = this.entryPointClassObj.defaults.draggable.background;
	this.cssdraggable["width"] = this.entryPointClassObj.defaults.draggable.width;
	this.cssdraggable["height"] = this.entryPointClassObj.defaults.draggable.height;

	var attrdraggable = { class:"draggable noselect",id:"draggable_" + index };
	var cssfont = {halign:"center",valign:"middle",fontSize:12,fontFamily:"verdana",fontWeight:"normal",fontStyle:"normal",fontColor:"#000",paddingTop:5,paddingRight:5,paddingBottom:5,paddingLeft:5} ;
	this.draggable.css(this.cssdraggable);
	this.draggable.attr(attrdraggable);
	libraryObj.setTextFormat(this.draggable,cssfont,displayText);

	this.draggable.find("img").on("dragstart",function(ev){
		//ev.preventDefault();
		return false; //prevent default for the images
	});

	this.mouseover = function(element){
		$(element).transition({ scale: 1.5 },200,'snap');
	};
	this.mouseout = function(element){
		$( element ).transition({ scale: 1 },200,'snap');
	};
	if (this.entryPointClassObj.defaults.draggable.rollover)
	{
		this.draggable.on("mouseenter",function(){
			M0201att_selfObj.mouseover( $(this) );
		}).on("mouseleave",function(){
			M0201att_selfObj.mouseout( $(this) );
		});
	}
	

	this.heighlightOnHover = function(e,color){
		$(e).css({
			backgroundColor:color
		});
	};
	this.clearAllHighlight = function(color,color2 ){
		for (var i=0;i< this.entryPointClassObj.respWidgets.length;i++ )
		{
			var $droppabletext = this.entryPointClassObj.respWidgets[i].respbox;
			$droppabletext.css({backgroundColor:color});
			
			var $droppablebox = this.entryPointClassObj.respWidgets[i].droppablebox;
			$droppablebox.css({backgroundColor:color2});
		}
	};

	var dragSettings = {dragAxis : "both", setBehaviorConstrainedToBoundaryPanel : false,
		dragStart : function(){M0201att_selfObj.dragStart();},
		dragMove : function(){M0201att_selfObj.dragMove();},
		dragEnd : function(){M0201att_selfObj.dragEnd();}	};

	this.draggable.makeDraggable(dragSettings);;
	
	this.dragStart = function(){
		var $draggable = this.draggable ; //get draggable widget from current object
		if (this.entryPointClassObj.defaults.draggable.rollover){
			$draggable.unbind("mouseenter mouseleave");	
		}
		
		$draggable.removeClass("magictime puffIn");
		if ( entryPointClassObj.defaults.draggable.resizeOnDrag.key ) 
		{
			$draggable.css({transform:"translate(0,0) scale(" +entryPointClassObj.defaults.draggable.resizeOnDrag.value+ ")"});
		}else {
			$draggable.css({transform:"translate(0,0)"});
		}	
		
	};

	this.dragMove = function(){
		var $draggable = this.draggable ;
		for (var i=0;i< this.entryPointClassObj.respWidgets.length;i++ )
		{
			this.clearAllHighlight(this.entryPointClassObj.defaults.droppable.responseText.backgroundActive, this.entryPointClassObj.defaults.droppable.responseBox.background ) ;

			var $droppable = this.entryPointClassObj.respWidgets[i].respbox;
			var $droppablebox = this.entryPointClassObj.respWidgets[i].droppablebox;
			if ( libraryObj.collision($droppable,$draggable) || libraryObj.collision($droppablebox,$draggable)){
				
				if ( $droppable.attr("id").indexOf("droppablebox_")!=-1 ) {
					this.hitIndex = parseInt($droppable.attr("id").replace("droppablebox_","")) ;	
				}else if ( $droppable.attr("id").indexOf("droppabletext_")!=-1 ) {
					this.hitIndex = parseInt($droppable.attr("id").replace("droppabletext_","")) ;	
				}	
				
				this.heighlightOnHover($droppable,this.entryPointClassObj.defaults.droppable.responseText.backgroundHover);
				break ;
			}else{
				this.hitIndex = -1;
			}
		}
	};

	this.dragEnd = function(){
		this.clearAllHighlight(this.entryPointClassObj.defaults.droppable.responseText.backgroundActive, this.entryPointClassObj.defaults.droppable.responseBox.background ) ;
		var $draggable = this.draggable ;
		var draggableIndex = parseInt($draggable.attr("id").replace("draggable_","")) ;
		
		if (this.hitIndex == -1){
			$draggable.attr({style:""}).css(this.cssdraggable).appendTo(this.entryPointClassObj.draggableHolder);
			this.entryPointClassObj.finalData[draggableIndex] = 0;
			$draggable.addClass("magictime puffIn");
			if (this.entryPointClassObj.defaults.draggable.rollover){
				$draggable.on("mouseenter",function(){
					M0201att_selfObj.mouseover( $(this) );
				}).on("mouseleave",function(){
					M0201att_selfObj.mouseout( $(this) );
				});
			}
			
		}else{
			var $droppable = $("#droppablebox_" + this.hitIndex ) ;
			
			var scaleX = ( $droppable.width()/$draggable.width() ).toFixed(2);
			var scaleY = ( $droppable.height()/ $draggable.height() ).toFixed(2);
			$draggable.css({position:"absolute",left:"50%",top:"50%",margin:""}).appendTo($droppable);
			$draggable.css({transform:"translate(-50%,-50%) scale(1.25)"});
			if ( this.entryPointClassObj.defaults.draggable.hideAfterDrop ) 
			{
				$draggable.transition({ scale: 0},500,'easeInBack' );
			}	else{
				//$draggable.addClass("magictime puffIn");
				$draggable.transition({ scale: [scaleX,scaleY]},500,'easeInBack' );
			}
			this.entryPointClassObj.finalData[draggableIndex] = this.hitIndex + 1; //store the finaldata
			if (this.entryPointClassObj.defaults.draggable.rollover){
				$draggable.unbind("mouseenter mouseleave");	
			}
			
		}
		//console.log(this.entryPointClassObj.finalData);
		this.setScaleData();
		
	};
	this.setScaleData = function(){
		var sortedData = new Array(this.entryPointClassObj.responseArray.length);
		for (var i=0;i<sortedData.length ;i++ )
		{
			sortedData[i] = this.entryPointClassObj.respWidgets[i].droppablebox.find("div.draggable");
			var dropdown = this.entryPointClassObj.respWidgets[i].dropdwon;
			dropdown.find('option').remove();
			for (var j=sortedData[i].length -1 ;j>=0 ;j-- )
			{
				var _attrIndex = parseInt( $( sortedData[i][j] ).attr("id").replace("draggable_","") );
				dropdown.append($('<option>', { 
					value: _attrIndex,
					text : this.entryPointClassObj.attributeArray[_attrIndex]
				}));
			}
		}
	};
	
}
function M0201resp(entryPointClassObj,displayText,index){
	var libraryObj = new Library();
	this.entryPointClassObj = entryPointClassObj;
	
	this.holder = libraryObj.createElement("div") ;
	this.respbox = libraryObj.createElement("div") ; //this is to show up the responseText
	this.dropdwon = libraryObj.createElement("select") ;
	
	this.droppablebox = libraryObj.createElement("div") ;
	
	this.cssholder = {float: "left",border:"1px none #f00"};
	this.cssholder["margin"] = entryPointClassObj.defaults.droppable.responseBox.margin + "px";

	this.cssrespbox = {},this.cssdroppablebox={};
	this.cssrespbox["border"] = "5px solid #f1f2f3";
	this.cssrespbox["position"] = "relative";
	this.cssrespbox["border-radius"] = "10px";
	this.cssrespbox["background"] = entryPointClassObj.defaults.droppable.responseText.backgroundActive;
	this.cssrespbox["width"] = entryPointClassObj.defaults.droppable.responseText.width + "px";
	this.cssrespbox["height"] = entryPointClassObj.defaults.droppable.responseText.height + "px";

	this.cssdroppablebox["border"] = entryPointClassObj.defaults.droppable.responseBox.border ;

	//this.cssdroppablebox["box-shadow"] = "0px 0px 10px 0px #d18e03" ;
	//this.cssdroppablebox["-moz-box-shadow"] = "0px 0px 10px 0px #d18e03" ;
	//this.cssdroppablebox["-webkit-box-shadow"] = "0px 0px 10px 0px #d18e03" ;

	this.cssdroppablebox["position"] = "relative" ;
	//this.cssdroppablebox["display"] = "table" ;
	this.cssdroppablebox["text-align"] = "center" ;
	this.cssdroppablebox["vertical-align"] = "middle" ;
	this.cssdroppablebox["border-radius"] = entryPointClassObj.defaults.droppable.responseBox.corner + "px" ;
	this.cssdroppablebox["margin"] =  "5px auto" ;
	this.cssdroppablebox["background"] = entryPointClassObj.defaults.droppable.responseBox.background ;
	this.cssdroppablebox["width"] = entryPointClassObj.defaults.droppable.responseBox.width + "px";
	this.cssdroppablebox["height"] = entryPointClassObj.defaults.droppable.responseBox.height + "px";

	
	this.cssdropdown = {margin:"5px auto",display:"none",width:this.cssrespbox.width};
	
	
	if (entryPointClassObj.defaults.droppable.showDropdowns){
		this.cssdropdown["display"] = "block";
	}
	
	var table ;
		
	if ( entryPointClassObj.defaults.droppable.orientation.toLowerCase() == "left" || entryPointClassObj.defaults.droppable.orientation.toLowerCase() == "right" ) {
		table = "<table><tr><td></td><td></td><td></td></tr></table>";
	}else {
		table = "<table><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table>";
	}
		
	this.holder.append(table);
		
	table = this.holder.find("table");
		
	if ( entryPointClassObj.defaults.droppable.orientation.toLowerCase() == "left" )
	{
		this.droppablebox.appendTo( table.find("tr").eq(0).find("td").eq(0) ) ;
		this.respbox.appendTo( table.find("tr").eq(0).find("td").eq(1) ) ;
		this.dropdwon.appendTo( table.find("tr").eq(0).find("td").eq(2) );
	}else if (entryPointClassObj.defaults.droppable.orientation.toLowerCase() == "right") {
		this.dropdwon.appendTo( table.find("tr").eq(0).find("td").eq(0) );
		this.respbox.appendTo( table.find("tr").eq(0).find("td").eq(1) ) ;
		this.droppablebox.appendTo( table.find("tr").eq(0).find("td").eq(2) ) ;
	}else if ( entryPointClassObj.defaults.droppable.orientation.toLowerCase() == "top" || entryPointClassObj.defaults.droppable.orientation.toLowerCase() == "bottom" ) {
		this.droppablebox.appendTo( table.find("tr").eq(0).find("td").eq(0) ) ;
		this.respbox.appendTo( table.find("tr").eq(1).find("td").eq(0) ) ;
		this.dropdwon.appendTo( table.find("tr").eq(2).find("td").eq(0) );
	}
	
	if (entryPointClassObj.defaults.droppable.orientation.toLowerCase() == "left" || entryPointClassObj.defaults.droppable.orientation.toLowerCase() == "right" )
	{
		if (entryPointClassObj.responseArray.length<=5)
		{
			this.cssholder["clear"] = "both";
		}
		this.cssrespbox["margin"] = "10px 5px 10px 5px";
	}else{
		this.cssrespbox["margin"] = "5px 10px 5px 10px";
	}
	
	this.attrrespbox = { class:"droppabletext",id:"droppabletext_" + index };
	this.attrdropdown = { class:"dropdown",id:"dropdown_" + index };
	
	this.attrdroppablebox = { class:"droppablebox",id:"droppablebox_" + index };
	var cssfont = {halign:"center",valign:"middle",fontSize:12,fontFamily:"verdana",fontWeight:"normal",fontStyle:"normal",fontColor:"#000",paddingTop:5,paddingRight:5,paddingBottom:5,paddingLeft:5} ;

	this.respbox.css(this.cssrespbox);
	this.dropdwon.css(this.cssdropdown);
	this.respbox.attr(this.attrrespbox);
	this.dropdwon.attr(this.attrdropdown);
	
	this.droppablebox.attr(this.attrdroppablebox);
	
	this.holder.css(this.cssholder);
	
	this.droppablebox.css(this.cssdroppablebox);
	

	libraryObj.setTextFormat(this.respbox,cssfont,displayText);

	this.holder.appendTo(entryPointClassObj.droppableHolder);
	
	 this.dropdwon.on('change',function() {
		 var attrIndex = $('option:selected', this).attr('value') ;
		 var respIndex = parseInt( $(this).attr("id").replace("dropdown_","") ); ;
		var $droppablebox = $("#droppablebox_" + respIndex);
		var $draggable = $droppablebox.find("div#draggable_" + attrIndex);
		
		if( !entryPointClassObj.defaults.draggable.hideAfterDrop ){
			$draggable.appendTo($droppablebox);
			var scaleX = ( $droppablebox.width()/$draggable.width() ).toFixed(2);
			var scaleY = ( $droppablebox.height()/ $draggable.height() ).toFixed(2);
			$draggable.css({transform:"translate(-50%,-50%) scale(1.25)"});
			$draggable.transition({ scale: [scaleX,scaleY]},500,'easeInBack' );
			entryPointClassObj.attWidgets[attrIndex].setScaleData();
		}
		
		
	});
	
}

function M0201Main(options){
	/*-----------Limitation--------*/
	// 1. maximum 5 scale with maximum height & width of 110

	
	this.defaults ={
		global:{
			stageWidth:780,
			stageBgColor:"#c0c0c0"
		},
		draggable:{
			width:95,
			height:95,
			background:"#d1d110",
			hideAfterDrop:false,
			resizeOnDrag:{key:true,value:"0.9,0.75"},
			rollover:true
		},
		droppable:{
			responseBox : {
				width:120,
				height:130,
				background:"#fcfcdc",
				border:"5px solid #f1f2f3",
				corner:10,
				margin:5
			},
			responseText : {
				width:120,
				height:70,
				backgroundActive:"#ffffff",
				backgroundHover:"#ff0000"
			},
			orientation:"top",
			showDropdowns:false
		}
	};
	this.defaults = $.extend(this.defaults,options);

	this.root = $("#demo-main-boundary-panel");
	this.responseArray = ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"];
	//this.attributeArray = ["Has fair prices","Has great deals/coupons","Offers a good value for the money","Has great tasting breakfast sandwiches","Has great tasting snacks","Has great tasting coffee","Has delicious baked goods","Has oven-toasted products","Has great tasting food for the afternoon","Has a wide variety of food items","Has foods that you can eat all day","Offers healthy food options","Always offers exciting new products"];
	this.attributeArray = ["Has fair prices","<img src='images/ie-logo-small.png' />","Offers a good value for the money","Has great tasting breakfast sandwiches","Has great tasting snacks","<img src='images/chrome-512.png' />","Has delicious baked goods","<img src='images/20141017135052!Safari_Logo.png' />","Has a wide variety of food items","<img src='images/Opera_Logo.png' />","Offers healthy food options","<img src='images/firefox-512.png' />"];
	this.finalData = [ ] ;
	this.backData = [ ] ;
	this.attWidgets = [ ];
	this.respWidgets =[ ] ;
	var libraryObj = new Library();
	this.draggableHolder = libraryObj.createElement("div") ;
	this.droppableHolder = libraryObj.createElement("div") ;
	var CSS_DROPPABLE_CONTAINER = {border:"1px none #000"};
	var CSS_DRAGGABLE_CONTAINER = {border:"1px none #000"};

	this.ModuleLoad = function(){
		
		if( this.defaults.droppable.orientation.toLowerCase() == "top" || this.defaults.droppable.orientation.toLowerCase() == "bottom" ){
			CSS_DROPPABLE_CONTAINER["display"] = "table" ;
			if(this.defaults.droppable.orientation.toLowerCase() == "top") {
				this.droppableHolder.appendTo(this.root);	
				this.draggableHolder.appendTo(this.root);	
				CSS_DROPPABLE_CONTAINER["margin"] = "5px auto 70px auto" ;
			}else if(this.defaults.droppable.orientation.toLowerCase() == "bottom") {
				this.draggableHolder.appendTo(this.root);	
				this.droppableHolder.appendTo(this.root);	
				CSS_DROPPABLE_CONTAINER["margin"] = "70px auto 5px auto" ;
			}
			CSS_DRAGGABLE_CONTAINER["display"] = "inline-block" ;
		}else if( this.defaults.droppable.orientation.toLowerCase() == "left" || this.defaults.droppable.orientation.toLowerCase() == "right" ) {
			var table = "<table width='100%' style='width:100%;'><tr><td></td><td></td></tr></table>";
			this.root.append(table);
			var $table = this.root.find("table") ;
			if ( this.defaults.droppable.orientation.toLowerCase() == "left" )
			{
				this.droppableHolder.appendTo( $table.eq(0).find("tr").eq(0).find("td").eq(0) );	
				this.draggableHolder.appendTo( $table.eq(0).find("tr").eq(0).find("td").eq(1) );	
				CSS_DRAGGABLE_CONTAINER["margin"] = "0 5px 0 70px" ;
			}else{
				this.droppableHolder.appendTo( $table.eq(0).find("tr").eq(0).find("td").eq(1) );	
				this.draggableHolder.appendTo( $table.eq(0).find("tr").eq(0).find("td").eq(0) );
				CSS_DROPPABLE_CONTAINER["margin"] = "0 5px 0 70px" ;
			}
			CSS_DROPPABLE_CONTAINER["display"] = "inline-block" ;
			CSS_DRAGGABLE_CONTAINER["display"] = "inline-block" ;
		}
		this.droppableHolder.css( CSS_DROPPABLE_CONTAINER );
		this.draggableHolder.css( CSS_DRAGGABLE_CONTAINER );

		for (var i=0;i< this.attributeArray.length; i++ )	{
			this.attWidgets[i] = new M0201att(this,this.attributeArray[i],i) ;
		}
	
		for (var i=0;i< this.responseArray.length; i++ )	{
			this.respWidgets[i] = new M0201resp(this,this.responseArray[i],i) ;
		}
		
		this.root.css({position:"relative",width:this.defaults["global"]["stageWidth"] + "px",background:this.defaults["global"]["stageBgColor"],padding:"5px"}).append("<div style='clear:both;'></div>");
	}

	
}

$.fn.M0201 = function(options){
	var entryPointObj = new M0201Main(options);
		entryPointObj.root	 = $(this);
		entryPointObj.ModuleLoad();
	return this;
}

$.fn.detachM0201 = function(){
	$(this).empty();
	return this;
}