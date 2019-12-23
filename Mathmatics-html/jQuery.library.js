function Library(){
	this.createElement = function(e){
		return $(document.createElement(e)) ;
	};
	
	this.setTextFormat = function(e,obj,text){
		var table = "<table width='100%' height='100%' style='width:"+e.width()+"px;height:"+e.height()+"px;'>";
		table += "<tr>" ;
		table += "<td width='100%' style='width:100%;text-align:"+obj.halign+";vertical-align:"+obj.valign+";font-size:"+obj.fontSize+"px;font-family:"+obj.fontFamily+";font-weight:"+obj.fontWeight+";font-style:"+obj.fontStyle+";color:"+obj.fontColor+";padding-top:"+obj.paddingTop+"px;padding-right:"+obj.paddingRight+"px;padding-bottom:"+obj.paddingBottom+"px;padding-left:"+obj.paddingLeft+"px;'>" ; 
		table += text;
		table += "</td>";
		table += "</tr>";
		table += "</table>";
		$(e).html(table);
		
		$(e).find("img").css({width:"100%",height:"auto"	});
		
	}

	this.collision = function (a,b){
		//a - droppable , b - drggable
		var Ax=$(a).offset().left;
		var Ay=$(a).offset().top;

		var Bx=$(b).offset().left + $(b)[0].getBoundingClientRect().width/2;
		var By=$(b).offset().top + $(b)[0].getBoundingClientRect().height/2;

		var Awidth = $(a)[0].getBoundingClientRect().width;
		var Aheight = $(a)[0].getBoundingClientRect().height;

		
		var Bwidth = $(b)[0].getBoundingClientRect().width;
		var Bheight = $(b)[0].getBoundingClientRect().height;
		
		var xOverlap = this.valueInRange(Ax, Bx, Bx ) || this.valueInRange(Bx, Ax, Ax + Awidth);
		var yOverlap = this.valueInRange(Ay, By, By) || this.valueInRange(By, Ay, Ay + Aheight);
		
		return xOverlap && yOverlap;
	};

	this.valueInRange = function (x, min, max) {
	  return x >= min && x <= max;
	};

	this.parseBool = function( str ){
		var boolmap = { 
			'no'    : false ,
			'NO'    : false ,
			'FALSE' : false ,
			'false' : false,
			'False':false,
			'yes'   : true ,
			'YES'   : true ,
			'TRUE'  : true ,
			'true'  : true ,
			'True':true
		};
		return ( str in boolmap && boolmap.hasOwnProperty(str)) ?  boolmap[ str ] :  !!str ;
	};
	this.getRandomColor = function() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
}
