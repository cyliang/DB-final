<?php
function test_login($admin) {
	session_start();
	if(!isset($_SESSION['login_id'])) {
		return false;
	}
	global $db;

	$stat = $db->prepare("SELECT `id`, `Name`, `power` FROM `User` WHERE `id` = ? LIMIT 1");
	$stat->execute(array($_SESSION['login_id']));
	return $stat->fetchObject();
}
?>
