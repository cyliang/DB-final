SELECT 'Favorite`.`id`, `Favorite`.`user_id`, `ticket_view`.* FROM `ticket_view`
	INNER JOIN `Favorite`
    	ON `ticket_view`.`f1_id` = `Favorite`.`flight_id1`
        AND `ticket_view`.`f2_id` <=> `Favorite`.`flight_id2`
        AND `ticket_view`.`f3_id` <=> `Favorite`.`flight_id3`