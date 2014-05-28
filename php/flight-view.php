<?php
require_once 'include/check_login.php';
require_once 'include/functs.php';

read_table("flight_view", array(
	"id",
	"Flight number",
	"Departure",
	"dep_name",
	"dep_country",
	"dep_city",
	"dep_long",
	"dep_lat",
	"Departure time",
	"Destination",
	"des_name",
	"des_country",
	"des_city",
	"des_long",
	"des_lat",
	"Arrival time",
	"Price"
), "id");
?>
