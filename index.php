<?php
require_once 'php/include/functs.php';

if($user = test_login()) {
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="author" content="Chih-Yung Liang">
	<title>Flight-managing System</title>

	<link rel="stylesheet" href="css/lib/jquery.sidr.<?=$user->power == 1 ? "dark" : "light"?>.css">
	<link rel="stylesheet" href="css/lib/bootstrap.min.css">
	<link rel="stylesheet" href="css/lib/jquery.remodal.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/lib/custom-theme/jquery-ui-1.10.4.custom.min.css">
</head>
<body><div class="remodal-bg">

<div id="sidr">
	<h1>Flight-managing System</h1>
	<ul>
		<li>
			<a href="#" data-target="flight">Flights</a>
			<ul>
				<li><a href="#" data-target="airport">Airports</a></li>
				<li><a href="#" data-target="city">Citys</a></li>
				<li><a href="#" data-target="country">Countrys</a></li>
			</ul>
		</li>
	<?php if($user->power == 1) { ?>
		<li><a href="#" data-target="user">Users management</a></li>
	<?php } ?>
		<li>
			<a>Account management</a>
			<ul>
				<li><a href="#" data-target="profile">Profile setting</a></li>
			<?php if($user->power != 1) { ?>	
				<li><a href="#">Account upgrading</a></li>
			<?php } ?>
			</ul>
		</li>
		<li><a href="#" data-target="logout">Logout</a></li>
	</ul>

	<h2>Ticket</h2>
	<ul>
		<li><a href="#" data-target="ticket">Ticket searching</a></li>
		<li><a href="#" data-target="track">Tracked tickets</a></li>
	</ul>

	<h2>Login as</h2>
	<p>Name: <?=filter_var($user->Name, FILTER_SANITIZE_SPECIAL_CHARS)?></p>
	<p>Email: <?=filter_var($user->email, FILTER_SANITIZE_SPECIAL_CHARS)?></p>
	<p>Identity: <?=$user->power == 1 ? "Administrator" : "User"?></p>
</div>

<div class="container">
<h1 class="text-center">
	Flight-managing System<br>
	<small class="funct">Welcome</small>
</h1>
<hr>
<div id="main"></div>
</div>

<script>
var user = <?=json_encode($user)?>;
</script>
<script src="js/lib/jquery-1.11.1.min.js"></script>
<script src="js/lib/jquery-ui-1.10.4.custom.min.js"></script>
<script src="js/lib/jquery.sidr.min.js"></script>
<script src="js/lib/jquery.remodal.min.js"></script>
<script src="js/lib/bootstrap.min.js"></script>
<script src="js/jquery-table.js"></script>
<script src="js/jquery-ticket.js"></script>
<script src="js/jquery-airport.js"></script>
<script src="js/airport-table.js"></script>
<script src="js/flight-table.js"></script>
<script src="js/user-table.js"></script>
<script src="js/menu.js"></script>
<script src="js/abPost.js"></script>

</div></body>
</html>
<?php
} else {
	include 'pages/intro.php';
}
?>
