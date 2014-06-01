<?php
require_once 'include/db.php';
require_once 'include/functs.php';

$user = test_login();
if($user === false) {
	die (json_encode(array(
		'status' => 'not_login'
	)));
}

$col_ary = array(
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
	"Transfer time",
	"Total flying time",
	"Total transferring time",
	"Overnight",
	"Price",

	"f1_id",
	"f2_id",
	"f3_id",
	"f1_number",
	"f2_number",
	"f3_number",

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


$order_str = isset($_POST['order_col'], $_POST['order_ord']) && in_array($_POST['order_col'], $col_ary) ? 
	"ORDER BY `{$_POST['order_col']}` ".($_POST['order_ord'] == "ASC" ? "ASC" : "DESC") :
	"";

$col_str = join("`, `", $col_ary);

$stat = $db->prepare("SELECT `$col_str` FROM `favorite_view` WHERE `user_id` = :uid $order_str LIMIT :page, 10");
$stat2 = $db->prepare("SELECT COUNT(*) FROM `favorite_view` WHERE `user_id` = :uid");
$stat->bindValue(
	':page',
	isset($_POST['page']) && filter_var($_POST['page'], FILTER_VALIDATE_INT) ? ($_POST['page'] - 1) * 10 : 0,
	PDO::PARAM_INT
);

$stat->bindValue(':uid', $user->id);
$stat2->bindValue(':uid', $user->id);

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
