<?php
require_once 'include/functs.php';

if(($user = test_login()) === false) {
	die(json_encode(array(
		"status" => "not_login"
	)));
}

if(isset($_POST['flight_id1']) && $_POST['flight_id1'] != "") {
	$stat = $db->prepare("INSERT INTO `Favorite` (`user_id`, `flight_id1`, `flight_id2`, `flight_id3`)
				VALUES ( :uid , :f1 , :f2 , :f3 )");
	$stat->execute(array(
		':uid' => $user->id,
		':f1' => $_POST['flight_id1'],
		':f2' => isset($_POST['flight_id2']) && $_POST['flight_id2'] != "" ? $_POST['flight_id2'] : null,
		':f3' => isset($_POST['flight_id3']) && $_POST['flight_id3'] != "" ? $_POST['flight_id3'] : null
	));

	if($stat->rowCount() === 1) {
		echo json_encode(array(
			"status" => "success",
			"data" => array()
		));
		exit();
	}
}

echo json_encode(array(
	"status" => "fail"
));

?>
