<?php
require_once 'functs.php';

$user = test_login();
if($user === false) {
	die(json_encode(array(
		"status" => "not_login"
	)));
} else if($user->power != 1) {
	die(json_encode(array(
		"status" => "not_admin"
	)));
}

?>
