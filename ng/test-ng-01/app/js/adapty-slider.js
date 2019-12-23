( function(){
	jQuery.fn.adaptySlider = function( options ){
		var defaults = {
			width: 450,
			height:480,
			activeSlide:0,
			maxHeight: 1200,
			borders: false,
			padding: { L: 0, R:0},
			duration: 1 //in seconds
		};
		var opt = jQuery.extend( {}, defaults, options ); //extending options by defaults
		if ( opt.width === 'auto' )
		{
			opt.width = jQuery( this ).parent().width();
		}
		if ( opt.height === 'auto' )
		{
			opt.height = jQuery( this ).parent().height();
		}
			//console.log('opt.width :',opt.width);
		var $ulSlider = jQuery( this ).each( function(){
			var wrapper = "<div class='wrapper-slider' style='position:relative;overflow:hidden;border:1px "+ ( opt.borders? "solid" : "none" ) +" #eaeaea;";
				wrapper += "width:"+ opt.width +"px;height:"+ opt.height +"px; '>" ;
				wrapper += "</div>";

				var t = ( opt.duration * 0.75 ), w = ( opt.duration * 0.25 );
			jQuery( this ).wrap( wrapper ).css({
				listStyle: "none",
				margin: 0,
				padding: 0,
				height: "100%",
				width: "66600px",
				position: "absolute",
				left: 0,
				top: 0,
				transition: "transform "+ t +"s ease "+ w +"s",
				'-webkit-transition' : "transform "+ t +"s ease "+ w +"s",
				'-moz-transition' : "transform "+ t +"s ease "+ w +"s",
				'-ms-transition' : "transform "+ t +"s ease "+ w +"s",
				'-o-transition' : "transform "+ t +"s ease "+ w +"s"
			}).children().each( function(){
				jQuery( this ).css({
					height: "100%",
					float: "left",
					display: "block",
					width: opt.width + "px"
				}).children().each( function(){
					jQuery( this ).css({
						display: "block",
						height: "100%",
						position:"relative",
						width: "100%"
					});
				}).children().each( function(){
					var _el = jQuery( this ).css({
						display: "block",
						verticalAlign: "middle",
						textDecoration: "none",
						position: "absolute",
						left: opt.padding.L + "px",
						right: opt.padding.R + "px",
						wordWrap: "break-word",
						top: "50%",
						bottom: "auto",
						transform: "translateY(-50%)",
						'-webkit-transform' : "translateY(-50%)",
						'-moz-transform' : "translateY(-50%)",
						'-ms-transform' : "translateY(-50%)",
						'-o-transform' : "translateY(-50%)",
						maxHeight: opt.maxHeight + "px" ,
						overflow:"hidden",
						margin: "auto auro",
						textAlign: "center"
					});
					//console.log(this, ', ',this.clientHeight, ', ', this.parentElement.scrollHeight );
					//if (  _el[0].clientHeight >= opt.maxHeight )
					//{
						//console.log( 'got it ', jQuery( this ));
						//_el.addClass( 'more' );
					//}
					
					//console.log('x :', );
				});;
			});
		});
		//console.log('$ulSlider :',$ulSlider);
		$ulSlider.each( function(){
			var $this = jQuery(this);
			//console.log($this.children().eq( opt.activeSlide ));
			$this.children().eq( opt.activeSlide ).addClass('active').siblings().removeClass('active');
			moveSlide( opt.activeSlide, opt.width, $this);
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