<?php
require_once 'include/check_login.php';
require_once 'include/functs.php';

read_table("City", array(
	"Name",
	"Country"
), "Name");
?>
