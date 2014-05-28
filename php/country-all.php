<?php
require_once 'include/check_login.php';
require_once 'include/db.php';

$stat = $db->query("SELECT `Name` FROM `Country`");
echo json_encode($stat->fetchAll(PDO::FETCH_COLUMN));
?>
