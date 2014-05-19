<?php
require_once 'php/include/db.php';
require_once 'php/include/functs.php';

if($user = test_login(false)) {
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="author" content="Chih-Yung Liang">
	<title>Flight-managing System</title>

	<link rel="stylesheet" href="css/lib/jquery.sidr.<?=$user->power == 1 ? "dark" : "light"?>.css">
	<link rel="stylesheet" href="css/lib/bootstrap.min.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/lib/custom-theme/jquery-ui-1.10.4.custom.min.css">
</head>
<body>

<div id="sidr">
	<h1>Flight-managing System</h1>
	<ul>
		<li><a href="#">Flights</a></li>
		<li>
			<a href="#">Airlines</a>
			<ul>
				<li><a href="#">Airports</a></li>
				<li><a href="#">Citys</a></li>
				<li><a href="#">Countrys</a></li>
			</ul>
		</li>
	<?php if($user->power == 1) { ?>
		<li><a href="#">Users management</a></li>
	<?php } ?>
		<li>
			<a>Account management</a>
			<ul>
				<li><a href="#">Profile setting</a></li>
			<?php if($user->power != 1) { ?>	
				<li><a href="#">Account upgrading</a></li>
			<?php } ?>
			</ul>
		</li>
		<li><a href="#" data-target="logout">Logout</a></li>
	</ul>

	<h2>Ticket</h2>
	<ul>
		<li><a href="#">Ticket searching</a></li>
		<li><a href="#">Tracked tickets</a></li>
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

<script src="js/lib/jquery-1.11.1.min.js"></script>
<script src="js/lib/jquery-ui-1.10.4.custom.min.js"></script>
<script src="js/lib/jquery.sidr.min.js"></script>
<script src="js/jquery-table.js"></script>
<script src="js/menu.js"></script>
<script src="js/abPost.js"></script>

</body>
</html>
<?php
} else {
	include 'pages/intro.php';
}
?>
