SELECT
        `id`,
        `Flight_number` AS `Flight number`,
        `Departure`,
        dep.`Name` AS `Departure name`,
        dep.`Country` AS `Departure country`,
        dep.`City` AS `Departure city`,
	dep.`Timezone` AS `Departure timezone`,
        dep.`longitude` AS `Departure longitude`,
        dep.`latitude` AS `Departure latitude`,
        `Departure_time` AS `Departure time`,
        `Destination`,
        des.`Name` AS `Destination name`,
        des.`Country` AS `Destination country`,
        des.`City` AS `Destination city`,
	des.`Timezone` AS `Destination timezone`,
        des.`longitude` AS `Destination longitude`,
        des.`latitude` AS `Destination latitude`,
        `Arrival_time` AS `Arrival time`,
	TIMEDIFF(
		CONVERT_TZ(`Arrival_time`, des.`Timezone`, dep.`Timezone`),
		`Departure_time`
	) AS `Flight time`,
        `Price`
FROM `Flight`
        LEFT JOIN `airport_view` AS dep
                ON `Flight`.`Departure` = dep.`IATA`
        LEFT JOIN `airport_view` AS des
                ON `Flight`.`Destination` = des.`IATA`
