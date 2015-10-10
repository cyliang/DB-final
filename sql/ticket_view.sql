SELECT
	0 AS `Transfer time`,
    
	`id` AS `f1_id`,
	null AS `f2_id`,
	null AS `f3_id`,
	
	`Flight number` AS `f1_number`,
    null AS `f2_number`,
    null AS `f3_number`,
    
    `Departure`,
    `Departure name`,
    `Departure country`,
    `Departure city`,
    `Departure timezone`,
    `Departure longitude`,
    `Departure latitude`,
    
    `Destination`,
    `Destination name`,
    `Destination country`, 
    `Destination city`, 
    `Destination timezone`, 
    `Destination longitude`, 
    `Destination latitude`,
    
    `Departure time`,
    `Arrival time`,
    `Flight time` AS `Total flying time`,
    CAST('00:00:00' AS TIME) AS `Total transferring time`,
    `Flight time` AS `Total time`,
    0 AS `Overnight`,
    `Price`,
    
    null AS `t1`,
    null AS `t1_name`,
    null AS `t1_country`,
    null AS `t1_city`,
    null AS `t1_timezone`,
    null AS `t1_longitude`,
    null AS `t1_latitude`,
    
    null AS `t2`,
    null AS `t2_name`,
    null AS `t2_country`,
    null AS `t2_city`,
    null AS `t2_timezone`,
    null AS `t2_longitude`,
    null AS `t2_latitude`,
    
    null AS `f1_arrival_time`,
    null AS `f2_departure_time`,
    null AS `f2_arrival_time`,
    null AS `f3_departure_time`,
    
    `Flight time` AS `f1_flight_time`,
    null AS `f2_flight_time`,
    null AS `f3_flight_time`
FROM `flight_view`
UNION
(
SELECT
	1,
    
	`f1`.`id` AS `f1_id`,
	`f2`.`id` AS `f2_id`,
	null AS `f3_id`,
    
	`f1`.`Flight number`,
    `f2`.`Flight number` asd,
    null,
    
    `f1`.`Departure`,
    `f1`.`Departure name`,
    `f1`.`Departure country`,
    `f1`.`Departure city`,
    `f1`.`Departure timezone`,
    `f1`.`Departure longitude`,
    `f1`.`Departure latitude`,
    
    `f2`.`Destination`,
    `f2`.`Destination name`,
    `f2`.`Destination country`, 
    `f2`.`Destination city`, 
    `f2`.`Destination timezone`, 
    `f2`.`Destination longitude`, 
    `f2`.`Destination latitude`,
    
    `f1`.`Departure time`,
    `f2`.`Arrival time`,
    ADDTIME(`f1`.`Flight time`, `f2`.`Flight time`),
    TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`),
    TIMEDIFF(
	CONVERT_TZ(`f2`.`Arrival time`, `f2`.`Destination timezone`, `f1`.`Departure timezone`),
	`f1`.`Departure time`
    ),
    TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) > CAST('12:00:00' AS TIME),
    (`f1`.`Price` + `f2`.`Price`) * 0.9,
    
    `f1`.`Destination` as sss,
    `f1`.`Destination name` as ssss,
    `f1`.`Destination country` as sssss, 
    `f1`.`Destination city` as ssssss, 
    `f1`.`Destination timezone` as sssssss, 
    `f1`.`Destination longitude` as ssssssss, 
    `f1`.`Destination latitude` as asdadasd,
    
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    
    `f1`.`Arrival time` qwe,
    `f2`.`Departure time` ewq,
    null,
    null,
    
    `f1`.`Flight time`fff,
    `f2`.`Flight time`ggg,
    null
FROM `flight_view` AS `f1`
	INNER JOIN `flight_view` AS `f2`
    	ON `f1`.`Destination` = `f2`.`Departure`
        AND TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) >= CAST('02:00:00' AS TIME)
)
UNION
(
SELECT
	2,
    
	`f1`.`id` a,
	`f2`.`id` s,
	`f3`.`id` d,
    
	`f1`.`Flight number` qq,
    `f2`.`Flight number` ww,
    `f3`.`Flight number` ee,
    
    `f1`.`Departure`,
    `f1`.`Departure name`,
    `f1`.`Departure country`,
    `f1`.`Departure city`,
    `f1`.`Departure timezone`,
    `f1`.`Departure longitude`,
    `f1`.`Departure latitude`,
    
    `f3`.`Destination`,
    `f3`.`Destination name`,
    `f3`.`Destination country`, 
    `f3`.`Destination city`, 
    `f3`.`Destination timezone`, 
    `f3`.`Destination longitude`, 
    `f3`.`Destination latitude`,
    
    `f1`.`Departure time`,
    `f3`.`Arrival time`,
    ADDTIME(`f1`.`Flight time`, ADDTIME(`f2`.`Flight time`, `f3`.`Flight time`)),
    ADDTIME(TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`), TIMEDIFF(`f3`.`Departure time`, `f2`.`Arrival time`)),
    TIMEDIFF(
	CONVERT_TZ(`f3`.`Arrival time`, `f3`.`Destination timezone`, `f1`.`Departure timezone`),
	`f1`.`Departure time`
    ),
    TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) > CAST('12:00:00' AS TIME) OR 
        TIMEDIFF(`f3`.`Departure time`, `f2`.`Arrival time`) > CAST('12:00:00' AS TIME),
    (`f1`.`Price` + `f2`.`Price` + `f3`.`Price`) * 0.8,
    
    `f2`.`Departure`  bbb,
    `f2`.`Departure name` ggg,
    `f2`.`Departure country` hhh,
    `f2`.`Departure city` jjj,
    `f2`.`Departure timezone` kkk,
    `f2`.`Departure longitude` lll,
    `f2`.`Departure latitude` uuu,
    
    `f3`.`Departure` yyy,
    `f3`.`Departure name` ttt,
    `f3`.`Departure country` ooo,
    `f3`.`Departure city` ppp,
    `f3`.`Departure timezone` tttt,
    `f3`.`Departure longitude` yyyy,
    `f3`.`Departure latitude` uuuu,
    
    `f1`.`Arrival time` iiii,
    `f2`.`Departure time` oooo,
    `f2`.`Arrival time` pppp,
    `f3`.`Departure time` llll,
    
    `f1`.`Flight time` aaaaaaa,
    `f2`.`Flight time` wwwwwww,
    `f3`.`Flight time` fffffff
FROM `flight_view` AS `f1`
	INNER JOIN `flight_view` AS `f2`
    	ON `f1`.`Destination` = `f2`.`Departure`
        AND TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) >= CAST('02:00:00' AS TIME)
    INNER JOIN `flight_view` AS `f3`
    	ON `f2`.`Destination` = `f3`.`Departure`
        AND TIMEDIFF(`f3`.`Departure time`, `f2`.`Arrival time`) >= CAST('02:00:00' AS TIME)
        AND `f1`.`Departure` != `f3`.`Departure`
        AND `f1`.`Destination` != `f3`.`Destination`
)
