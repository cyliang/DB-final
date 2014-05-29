<?php
require_once 'include/check_login.php';
require_once 'include/functs.php';

read_table("flight_view", array(
	"id",
	"Flight number",
	"Departure",
	"Departure name",
	"Departure country",
	"Departure city",
	"Departure timezone",
	"Departure longitude",
	"Departure latitude",
	"Departure time",
	"Destination",
	"Destination name",
	"Destination country",
	"Destination city",
	"Destination timezone",
	"Destination longitude",
	"Destination latitude",
	"Arrival time",
	"Flight time",
	"Price"
), "id", "Flight number");
?>
