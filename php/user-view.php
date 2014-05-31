<?php
require_once 'include/check_admin.php';
require_once 'include/functs.php';

read_table("user_view", array(
	"id",
	"email",
	"Name",
	"Identity"
), "id");
?>
