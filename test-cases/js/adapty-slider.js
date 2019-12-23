( function(){
	jQuery.fn.mySlider = function( options ){
		var defaults = {
			width: 450,
			height:480,
			duration: 1 //in seconds
		};
		var opt = jQuery.extend( {}, defaults, options ); //extending options by defaults
		
		var $ulSlider = jQuery( this ).each( function(){
			var wrapper = "<div class='wrapper-slider' style='position:relative;overflow:hidden;border:1px solid #eaeaea;";
				wrapper += "width:"+ opt.width +"px;height:"+ opt.height +"px; '>" ;
				wrapper += "</div>";
			jQuery( this ).wrap( wrapper ).css({
				listStyle: "none",
				margin: 0,
				padding: 0,
				height: "100%",
				width: "66600px",
				position: "absolute",
				left: 0,
				top: 0,
				transition: "transform 1s ease 0.5s",
				'-webkit-transition' : "transform 1s ease 0.5s",
				'-moz-transition' : "transform 1s ease 0.5s",
				'-ms-transition' : "transform 1s ease 0.5s",
				'-o-transition' : "transform 1s ease 0.5s"
			}).children().each( function(){
				jQuery( this ).css({
					height: "100%",
					float: "left",
					display: "block",
					width: opt.width + "px"
				}).children().each( function(){
					jQuery( this ).css({
						display: "table",
						height: "100%",
						padding: "5px"
					});
				}).children().each( function(){
					jQuery( this ).css({
						display: "table-cell",
						verticalAlign: "middle",
						textDecoration: "none",
						textAlign: "center"
					});
				});;
			});
		});
		//console.log('$ulSlider :',$ulSlider);
		$ulSlider.each( function(){
			var $this = jQuery(this);
			setInterval( function(){
				var index = $this.find('.active').index();
				if ( index != $this.children().length && index != -1 )
				{
					index++;
					
				}
				if ( index == $this.children().length || index == -1 )
				{
					index= 0;
				}
				$this.children().eq( index ).addClass('active').siblings().removeClass('active');
				moveSlide( index, opt.width, $this);
			}, (opt.duration * 1000 ));
		});

		function moveSlide( i, w, el ){
			var _x = - ( w*i );
			jQuery( el ).css({
				transform: "translateX("+ _x +"px)",
				'-webkit-transform' : "translateX("+ _x +"px)"
			});
		}

		return this;
	};
})();	