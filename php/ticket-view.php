<?php
require_once 'include/db.php';

$col_ary = array(
	"Transfer time",

	"f1_number",
	"f2_number",
	"f3_number",

	"Departure",
	"Departure name",
	"Departure country",
	"Departure city",
	"Departure timezone",
	"Departure longitude",
	"Departure latitude",
	
	"Destination",
	"Destination name",
	"Destination country",
	"Destination city",
	"Destination timezone",
	"Destination longitude",
	"Destination latitude",
	
	"Departure time",
	"Arrival time",
	"Total flying time",
	"Total transferring time",
	"Overnight",
	"Price",

	"t1",
	"t1_name",
	"t1_country",
	"t1_city",
	"t1_timezone",
	"t1_longitude",
	"t1_latitude",

	"t2",
	"t2_name",
	"t2_country",
	"t2_city",
	"t2_timezone",
	"t2_longitude",
	"t2_latitude",

	"f1_arrival_time",
	"f2_departure_time",
	"f2_arrival_time",
	"f3_departure_time",

	"f1_flight_time",
	"f2_flight_time",
	"f3_flight_time"
);

$search_col = array();
$search_val = array();

if(isset($_GET['dep_type'], $_GET['dep']) && $_GET['dep_type'] != 'all') {
	$search_val[':dep'] = $_GET['dep'];
	switch($_GET['dep_type']) {
	case 'country':
		$search_col[] = '`Departure country` = :dep';
		break;
	case 'city':
		$search_col[] = '`Departure city` = :dep';
		break;
	case 'airport':
		$search_col[] = '`Departure` = :dep';
		break;
	default:
		unset($search_val[':dep']);
	}
}

if(isset($_GET['des_type'], $_GET['des']) && $_GET['des_type'] != 'all') {
	$search_val[':des'] = $_GET['des'];
	switch($_GET['des_type']) {
	case 'country':
		$search_col[] = '`Destination country` = :des';
		break;
	case 'city':
		$search_col[] = '`Destination city` = :des';
		break;
	case 'airport':
		$search_col[] = '`Destination` = :des';
		break;
	default:
		unset($search_val[':des']);
	}
}

if(isset($_GET['date_type']) && $_GET['date_type'] != 'all') {
	$search_val[':date'] = $_GET['date'];
	switch($_GET['date_type']) {
	case 'dep':
		$search_col[] = '`Departure time` >= :date';
		break;
	case 'ari':
		$search_col[] = '`Arrival time` <= :date';
		break;
	default:
		unset($search_val[':date']);
	}
}

if(isset($_GET['trans'])) {
	$search_val[':trans'] = $_GET['trans'];
	$search_col[] = '`Transfer time` <= :trans';
}

$search_str = count($search_col) > 0 ? "WHERE ".join(" AND ", $search_col) : "";



$order_str = isset($_POST['order_col'], $_POST['order_ord']) && in_array($_POST['order_col'], $col_ary) ? 
	"ORDER BY `{$_POST['order_col']}` ".($_POST['order_ord'] == "ASC" ? "ASC" : "DESC") :
	"";

$col_str = join("`, `", $col_ary);

$stat = $db->prepare("SELECT `$col_str` FROM `ticket_view` $search_str $order_str LIMIT :page, 10");
$stat2 = $db->prepare("SELECT COUNT(*) FROM `ticket_view` $search_str");
$stat->bindValue(
	':page',
	isset($_POST['page']) && filter_var($_POST['page'], FILTER_VALIDATE_INT) ? ($_POST['page'] - 1) * 10 : 0,
	PDO::PARAM_INT
);

foreach($search_val as $col => $val) {
	$stat->bindValue($col, $val);
	$stat2->bindValue($col, $val);
}

$stat->execute();
$stat2->execute();

echo json_encode(array(
	"status" => "success",
	"data" => array(
		"data" => $stat->fetchAll(PDO::FETCH_ASSOC),
		"totalPage" => ceil($stat2->fetchColumn() / 10)
	)
));

?>
