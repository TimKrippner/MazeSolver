$('.upload-btn').on('click', function (){
	$('#upload-input').click();
	$('.progress-bar').text('0%');
	$('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){
	var files = $(this).get(0).files;
	if (files.length > 0){
	var formData = new FormData();

	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		formData.append('uploads[]', file, file.name);
	}

	$.ajax({
		url: '/upload',
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		success: function(data){
			console.log('upload successful');
			var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");

			var nodeArray = JSON.parse(data);
			var stepCount = 0;
			for(y = 0; y < nodeArray.length; y++){
				for (x = 0; x < nodeArray[1].length; x++){
					var node = nodeArray[y][x];
					if(node.character == '#'){
						ctx.strokeStyle = "black";
					}
					if(node.character == '.'){
						ctx.strokeStyle = "white";
					}
					if(node.character == '@'){
						ctx.strokeStyle = "yellow";
						stepCount++;
					}
					if(node.character == 'A'){
						ctx.strokeStyle = "green";
					}
					if(node.character == 'B'){
						ctx.strokeStyle = "red";
						stepCount++;
					}
					ctx.beginPath();
					ctx.lineWidth = "6";
					ctx.rect(x*10, y*10, 1, 1);
					ctx.stroke();
				}
			}
			document.getElementById("stepsToFinish").innerHTML = "Number of steps to solution: " + stepCount;
		},
		xhr: function() {
			var xhr = new XMLHttpRequest();

			xhr.upload.addEventListener('progress', function(evt) {

				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					percentComplete = parseInt(percentComplete * 100);
					$('.progress-bar').text(percentComplete + '%');
					$('.progress-bar').width(percentComplete + '%');
					if (percentComplete === 100) {
						$('.progress-bar').html('Done');
					}
				}
			}, false);

			return xhr;
		}
	});

	}
});
