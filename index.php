<?php
session_start();
if (isset($_SESSION['message'])) {
	if ($_SESSION['message'] == true) {
		echo "<script type='text/javascript'>alert('Registered successfully')</script>";
	} else {
		echo "<script type='text/javascript'>alert('Registration failed!')</script>";
	}
	unset($_SESSION['message']);
}
?>

<!DOCTYPE html>
<html>
	<head>
		<title>wheel of fortune</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet">
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	</head>
	<body>
		<div class="menu">
			<div class="menu_left">
				<p><span class="label_score">TODAY'S SCORE - </span><span class="label_points" id="label_points_today">0</span></p>
				<p class="btn_leader">DAILLY LEADERBOARD</p>
			</div>
			<div class="menu_right">
				<p><span class="label_score">TOTAL SCORE - </span><span class="label_points" id="label_points_total">0</span></p>
				<p class="btn_leader">OVERALL LEADERBOARD</p>
			</div>
		</div>
		<canvas id="canvas" width=500 height=500></canvas>
		<p id="txt_points"></p>
		<p onclick="startSpin()" class="btn_spin">SPIN</p>

		<div id="mancha">
			<div id="form_wrapper">
				<div class="form_header">
					<p>Subscribe</p>
					<i id="close" onclick="hideForm()" class="fa fa-times" aria-hidden="true"></i>
				</div>
				<div class="form_body">
					<form method="post" action="/mail.php">
						<input class="form_input" hidden type="text" name="points" id="input_points">
						<div class="input_wrapper" id="name_wrapper">
							<input placeholder="Name" class="form_input" type="text" name="name" id="name" required>
						</div>
						<div class="input_wrapper" id="email_wrapper">
							<input placeholder="Email" class="form_input" type="email" name="email" id="password" required>
						</div>
						<div style="text-align: center">
							<input class="btn_submit" type="submit" value="Submit">
						</div>
					</form>
				</div>
			</div>
		</div>

		<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
		<script type="text/javascript" src="data_source.js"></script>
		<script type="text/javascript" src="utils.js"></script>
		<script type="text/javascript" src="game.js"></script>
		<script type="text/javascript" src="main.js"></script>
	</body>
</html>