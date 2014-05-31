<?php
require_once 'include/db.php';

$stat = $db->query("SELECT `Name`, `Country` FROM `City` ORDER BY `Country`");
echo json_encode($stat->fetchAll(PDO::FETCH_ASSOC));
?>
