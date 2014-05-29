<?php
require_once 'include/functs.php';
require_once 'include/lib/password.php';
$user = test_login();

if($user === false) {
	die (json_encode(array(
		'status' => 'not_login'
	)));
}

$col_ary = array();
$val_ary = array();

if(isset($_POST['Name']) && $_POST['Name'] != "") {
	$col_ary[] = "`Name` = :name";
	$val_ary[':name'] = $_POST['Name'];
}

if(isset($_POST['password']) && $_POST['password'] != "") {
	$col_ary[] = "`password` = :password";
	$val_ary[':password'] = password_hash($user->email.$_POST['password'], PASSWORD_DEFAULT);
}

$val_ary[':id'] = $user->id;
$stat = $db->prepare("UPDATE `User` SET ".join(" , ", $col_ary)." WHERE `id` = :id");
$stat->execute($val_ary);

echo json_encode(array(
	"status" => 'success',
	"data" => array()
));
?>
