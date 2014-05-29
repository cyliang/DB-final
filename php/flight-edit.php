<?php
require_once 'include/check_admin.php';
require_once 'include/functs.php';

edit_entry('Flight', 'id', array(
	'Flight_number', 
	'Departure',
	'Destination',
	'Departure_time',
	'Arrival_time',
	'Price'
));
?>
