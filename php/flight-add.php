<?php
require_once 'include/check_admin.php';
require_once 'include/functs.php';

if(isset($_POST['Departure_time'])) {
	$_POST['Departure_datetime'] = $_POST['Departure_time'];
}

if(isset($_POST['Arrival_time'])) {
	$_POST['Destination_datetime'] = $_POST['Arrival_time'];
}

add_entry("Flight", array(
	'Flight_number', 
	'Departure',
	'Destination',
	'Departure_datetime',
	'Destination_datetime',
	'Price'
));

?>
