<?php
require_once 'include/check_admin.php';
require_once 'include/functs.php';

edit_entry('Airport', 'IATA', array(
	'IATA', 
	'Name',
	'longitude',
	'latitude',
	'City',
	'Timezone'
));
?>
