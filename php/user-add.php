<?php
require_once 'include/check_admin.php';
require_once 'include/lib/password.php';
require_once 'include/functs.php';

if(isset($_POST['Name'], $_POST['email'], $_POST['password'], $_POST['power']) && 
$_POST['Name'] != "" && $_POST['password'] != "" && ($_POST['power'] == 0 || $_POST['power'] == 1) 
&& filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {

	$stat = $db->prepare("INSERT INTO `User` (`email`, `password`, `Name`, `power`)
					VALUES ( :email , :pwd , :name , :power )");
	$stat->execute(array(
		":email" => $_POST['email'],
		":name" => $_POST['Name'],
		":pwd" => password_hash($_POST['email'].$_POST['password'], PASSWORD_DEFAULT),
		":power" => $_POST['power']
	));

	if($stat->errorCode() == "23000") {
		echo json_encode(array(
			"status" => "email_exist"
		));
	} else if($stat->rowCount() === 1) {
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
