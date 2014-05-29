<?php
require_once 'include/functs.php';

$user = test_login();
echo json_encode($user === false ?
	array(
		"status" => "not_login",
		"data" => array()
	) : array(
		"status" => "success",
		"data" => $user
	)
);
?>
