<?php
/* 	user-login.php
 *
 * 	Receive from:
 * 		POST:
 * 			- email
 * 			- password
 *
 * 	Respond: {
 * 		status: "success"| "fail"
 * 	}
 */
require_once "include/db.php";
require_once "include/lib/password.php";

if(isset($_POST['email'], $_POST['password']) && $_POST['email'] != "" && $_POST['password'] != "") {
	$stat = $db->prepare("SELECT `id`, `password` FROM `User` WHERE `email` = ? LIMIT 0, 1");
	$stat->execute(array($_POST['email']));

	if(($user = $stat->fetch()) && password_verify($_POST['email'].$_POST['password'], $user['password'])) {
		session_start();
		$_SESSION['login_id'] = $user['id'];
		
		echo json_encode(array(
			"status" => "success"
		));
		exit();
	}
}
echo json_encode(array(
	"status" => "fail"
));
?>
