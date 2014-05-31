<?php
require_once 'include/check_login.php';
require_once 'include/db.php';

$stat = $db->query("SELECT `IATA`, `Name`, `Country` FROM `airport_view` ORDER BY `Country`");
echo json_encode($stat->fetchAll(PDO::FETCH_ASSOC));
?>
