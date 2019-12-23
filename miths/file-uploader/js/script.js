window.addEventListener('load', function(){
	//croppingTool();
	dragDrop( document.getElementsByClassName('layer')[0].getElementsByClassName('cropper')[0]);
}, false);

function refreshPic(){
	var uploader = document.getElementById('uploader');

	if (uploader.files.length>0) {
		var reader = new FileReader();
		reader.addEventListener('load',function(e){
			document.getElementById("profile-pic").src = e.target.result;
			document.getElementsByClassName('layer')[0].classList.add('active');
		},false);
		reader.readAsDataURL(uploader.files[0]);
	}else{
		document.getElementsByClassName('layer')[0].classList.remove('active');
	};
}
function doneCropping(){
	document.getElementsByClassName('layer')[0].classList.remove('active');
}


function dragDrop( el ){
	var _this = el;
	//console.log('_this : ',_this)
	// _this.addEventListener('mousedown', function( event ) {
	// 	console.log('mousedown : ');

	// 	this.addEventListener('mousemove', function( event ){
 //        	console.log('mousemove : ');
 //        	this.addEventListener('mouseup', handlerMouseUp ,false);
 //        },false);
	// });
	_this.addEventListener('mousedown', handlerMouseDown,false);
	_this.addEventListener('mouseup', handlerMouseUp,false);
	
	function handlerMouseDown( event ){
		console.log('mousedown : ');
		this.addEventListener('mousemove', handlerMouseMove ,false);
	}
	function handlerMouseUp( event){
		console.log('mouseup : ');
		this.removeEventListener('mousemove',handlerMouseMove, false);
		this.removeEventListener('mouseup',handlerMouseUp, false);

		return false;
	}
	function handlerMouseMove( event ){
		console.log('mousemove : ');
	}
}

function croppingTool(){
	var canvas = document.getElementById('cropping-tool'),
		_left = canvas.offsetLeft,
	    _top = canvas.offsetTop,
	    ctx = canvas.getContext('2d');
	    ctx.fillStyle="green";
	    

	canvas.addEventListener('mousedown', function( event ) { 
        var md = getXY(event);
        console.log('md : ',md);

        this.addEventListener('mousemove', function( event ){
        	var mm = getXY(event);
        	console.log('mm : ',mm);
        },false);
	}, false);

	canvas.addEventListener('mouseup', function( event ) { 
		var mu = getXY(event);
        console.log('mu : ',mu);
         canvas.removeEventListener('mousemove', function( event ){
         	console.log('removeEventListener : ')
        	//var mm = { x : event.pageX - _left, y: event.pageY - _top};
        	//console.log('mm : ',mm);
        	return false;
        },false);
	});

	function getXY( event ){
		return { x : event.pageX - _left, y: event.pageY - _top};
	}

}