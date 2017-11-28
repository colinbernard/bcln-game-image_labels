<!DOCTYPE html>
<html>
<head>
	<title>BCLN - Image Labelling</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato"><!-- google web font -->
	<link rel="stylesheet" type="text/css" href="style/style.css"/>
	<link rel="shortcut icon" href="images/favicon.ico"/>
	<script src="https://bclearningnetwork.com/lib/jquery/jquery-3.1.0.min.js"></script>
	<script src="https://bclearningnetwork.com/lib/createjs/createjs-2015.11.26.min.js"></script><!-- CreateJS library hosted on BCLN server -->
	<script src="lib/ndgmr.Collision.js"></script>

	<script>
		var questions = [];
		

		var version = "<?=$_GET['title']?>";

		var number_of_buttons;

		$.getJSON("versions/"+version+"/questions.json", function(json) {
			questions = json;
		});

		$.getJSON("versions/"+version+"/data.json", function(json) {
			number_of_buttons = json;
		});
	</script>

	<script type="text/javascript" src="helper.js"></script><!-- contains helper functions which do not call functions in balloon.js -->
	<script type="text/javascript" src="labels.js"></script><!-- the main game JS file -->
</head>
<body onload="init();"><!-- body onload calls function to initialize game -->

	<canvas id="gameCanvas" width="550" height="600">
		<!-- game will be rendered here -->
	</canvas>

</body>
</html>
