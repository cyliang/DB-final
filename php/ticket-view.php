<?php
require_once 'include/functs.php';

read_table("ticket_view", array(
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
), "");
?>
