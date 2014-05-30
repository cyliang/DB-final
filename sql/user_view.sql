SELECT
	`id`,
	`email`,
	`Name`,
	CASE(`power`)
		WHEN 1 THEN 'Administrator'
		WHEN 0 THEN 'User'
	END AS `Identity`
FROM `User`
