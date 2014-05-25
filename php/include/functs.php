<?php
require_once 'db.php';

function test_login() {
	session_start();
	if(!isset($_SESSION['login_id'])) {
		return false;
	}
	global $db;

	$stat = $db->prepare("SELECT `id`, `Name`, `email`, `power` FROM `User` WHERE `id` = ? LIMIT 1");
	$stat->execute(array($_SESSION['login_id']));
	return $stat->fetchObject();
}

function read_table($table_name, $col_ary, $primary_key) {
	global $db;

	$order_str = isset($_POST['order_col'], $_POST['order_ord']) && in_array($_POST['order_col'], $col_ary) ? 
		"ORDER BY {$_POST['order_col']} ".($_POST['order_ord'] == "ASC" ? "ASC" : "DESC") :
		"";

	$search_str = isset($_POST['search_col'], $_POST['search_val']) && in_array($_POST['search_col'], $col_ary) ?
		"WHERE {$_POST['search_col']} LIKE :search" :
		"";

	$col_str = join("`, `", $col_ary);
	$stat = $db->prepare("SELECT `$col_str` FROM `$table_name` $search_str $order_str LIMIT :page, 10");
	$stat->bindValue(
		':page',
		isset($_POST['page']) && filter_var($_POST['page'], FILTER_VALIDATE_INT) ? ($_POST['page'] - 1) * 10 : 0,
		PDO::PARAM_INT
	);

	if($search_str != "") {
		$stat->bindValue(':search', "%{$_POST['search_val']}%");
	}

	$stat->execute();

	$stat2 = $db->query("SELECT COUNT(*) FROM `$table_name`");

	echo json_encode(array(
		"status" => "success",
		"data" => array(
			"data" => $stat->fetchAll(PDO::FETCH_ASSOC),
			"totalPage" => ceil($stat2->fetchColumn() / 10),
			"primary" => $primary_key
		)
	));
}
?>
