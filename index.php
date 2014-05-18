<?php
require_once 'php/include/functs.php';

if($user = test_login(false)) {
	echo "login";
} else {
	include 'pages/intro.php';
}
?>
