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

function read_table($table_name, $col_ary, $primary_key, $default_orderby = null) {
	global $db;

	$order_str = isset($_POST['order_col'], $_POST['order_ord']) && in_array($_POST['order_col'], $col_ary) ? 
		"ORDER BY `{$_POST['order_col']}` ".($_POST['order_ord'] == "ASC" ? "ASC" : "DESC").($default_orderby === null ? "" : ", `$default_orderby`") :
		($default_orderby === null ? "" : "ORDER BY `$default_orderby`");

	$search_str = isset($_POST['search_col'], $_POST['search_val']) && in_array($_POST['search_col'], $col_ary) ?
		"WHERE `{$_POST['search_col']}` LIKE :search" :
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

	$stat2 = $db->prepare("SELECT COUNT(*) FROM `$table_name` $search_str");
	if($search_str != "") {
		$stat2->bindValue(':search', "%{$_POST['search_val']}%");
	}
	$stat2->execute();

	echo json_encode(array(
		"status" => "success",
		"data" => array(
			"data" => $stat->fetchAll(PDO::FETCH_ASSOC),
			"totalPage" => ceil($stat2->fetchColumn() / 10),
			"primary" => $primary_key
		)
	));
}

function remove_entry($table_name, $primary_key) {
	global $db;

	if(isset($_POST['key'])) {
		$stat = $db->prepare("DELETE FROM `$table_name` WHERE `$primary_key` = ?");
		$stat->execute(array($_POST['key']));

		echo json_encode(array(
			"status" => $stat->rowCount() === 1 ? "success" : "fail",
			"data" => array()
		));
	} else {
		echo json_encode(array(
			"status" => "fail"
		));
	}
}

function edit_entry($table_name, $primary_key, $changeable_col) {
	if(isset($_POST['key'])) {
		$col_ary = array();
		$val_ary = array();

		foreach($changeable_col as $col) {
			if(isset($_POST[$col]) && $_POST[$col] != "") {
				$col_ary[] = $col;
				$val_ary[] = $_POST[$col];
			}
		}

		if(count($col_ary) > 0) {
			global $db;

			$stat = $db->prepare("UPDATE `$table_name` SET `".join('` = ?, `', $col_ary)."` = ?
					WHERE `$primary_key` = ?");
			$val_ary[] = $_POST['key'];
			$stat->execute($val_ary);
		}
		echo json_encode(array(
			"status" => "success",
			"data" => array()
		));
	} else {
		echo json_encode(array(
			"status" => "fail"
		));
	}
}

function add_entry($table_name, $col_ary) {
	$val_ary = array();
	$q_ary = array();

	foreach($col_ary as $col) {
		if(!isset($_POST[$col]) || $_POST[$col] == "") {
			echo json_encode(array(
				"status" => "fail"
			));
			return;
		}

		$val_ary[] = $_POST[$col];
		$q_ary[] = '?';
	}

	global $db;
	$stat = $db->prepare("INSERT INTO $table_name (`".join('`, `', $col_ary)."`)
				VALUES ( ".join(' , ', $q_ary)." )");
	$stat->execute($val_ary);

	echo json_encode(array(
		"status" => $stat->rowCount() === 1 ? "success" : "fail",
		"data" => array()
	));
}
?>
