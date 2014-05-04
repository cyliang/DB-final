<?php
/*	user-regist.php
 * 		- Create the account.
 *
 *	receive from:
 *		POST:
 *			- name
 *			- email
 *			- password
 *
 * 	respond: {
 * 		status: "success"| "email_exist"| "fail"
 * 	}
 */
require_once 'include/db.php';
require_once 'include/lib/password.php';

if(isset($_POST['name'], $_POST['email'], $_POST['password']) && 
	$_POST['name'] != "" && $_POST['password'] != "" && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
	$stat = $db->prepare("INSERT INTO `User` (`email`, `password`, `Name`, `power`)
					VALUES ( :email , :pwd , :name , 0 )");
	$stat->execute(array(
		":email" => $_POST['email'],
		":name" => $_POST['name'],
		":pwd" => password_hash($_POST['email'].$_POST['password'], PASSWORD_DEFAULT)
	));

	if($stat->errorCode() == "23000") {
		echo json_encode(array(
			"status" => "email_exist"
		));
	} else if($stat->rowCount() === 1) {
		session_start();
		$_SESSION['login_id'] = $db->lastInsertID("id");
		echo json_encode(array(
			"status" => "success"
		));
	} else {
		echo json_encode(array(
			"status" => "fail"
		));
	}
} else {
	echo json_encode(array(
		"status" => "fail"
	));
}

?>
