<?php
require_once 'functs.php';

if(test_login() === false) {
	die(json_encode(array(
		"status" => "not_login"
	)));
}

?>
