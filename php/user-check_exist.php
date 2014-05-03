<?php
/* 	user-check_exist.php
 *  		- Check if the email is exist.
 *
 * 	receive from:
 * 		POST:
 * 			- email
 *
 * 	respond: {
 * 		status: "OK"| "exist"| "fail"
 * 	}
 */
require_once 'include/db.php';

if(isset($_POST['email'])) {
	$stat = $db->prepare("SELECT COUNT(*) FROM `User` WHERE `email` = ?");
	$stat->execute(array($_POST['email']));

	echo json_encode(array(
		"status" => $stat->fetchColumn() >= 1 ? "exist" : "OK"
	));
} else {
	echo json_encode(array(
		"status" => "fail"
	));
}
?>
