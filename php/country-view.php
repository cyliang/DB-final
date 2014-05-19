<?php
require_once 'include/db.php';

$stat = $db->prepare("SELECT `Name` FROM `Country` LIMIT :page, 10");
$stat->bindValue(
	':page',
	isset($_POST['page']) && filter_var($_POST['page'], FILTER_VALIDATE_INT) ? ($_POST['page'] - 1) * 10 : 0,
	PDO::PARAM_INT
);
$stat->execute();

$stat2 = $db->query("SELECT COUNT(*) FROM `Country`");

echo json_encode(array(
	"status" => "success",
	"data" => array(
		"data" => $stat->fetchAll(PDO::FETCH_ASSOC),
		"totalPage" => ceil($stat2->fetchColumn() / 10)
	)
));
?>
