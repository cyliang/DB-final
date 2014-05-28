<?php
require_once 'include/check_login.php';
require_once 'include/functs.php';

read_table("airport_view", array(
	"IATA",
	"Name",
	"longitude",
	"latitude",
	"Timezone",
	"City",
	"Country"
), "IATA");
?>
