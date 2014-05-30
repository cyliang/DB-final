SELECT
	`Airport`.`IATA` AS `IATA`,
	`Airport`.`Name` AS `Name`,
	`Airport`.`longitude` AS `longitude`,
	`Airport`.`latitude` AS `latitude`,
	`Airport`.`City` AS `City`,
	`Airport`.`Timezone` AS `Timezone`,
	`City`.`Country` AS `Country`
FROM `Airport`
	LEFT JOIN `City`
		ON `Airport`.`City` = `City`.`Name`
