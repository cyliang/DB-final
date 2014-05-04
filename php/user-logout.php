<?php
session_start();
unset($_SESSION['login_id']);
echo json_encode(array(
	"status" => "success"
));
?>
