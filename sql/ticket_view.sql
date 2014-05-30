SELECT
	0 AS `t_time`,
    
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
    `Flight time`,
    0 AS `Transfer time`,
    0 AS `overnight`,
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
	1 AS `t_time`,
    
	`f1`.`Flight number`,
    `f2`.`Flight number`,
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
    IF(TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) > '12:00:00', 1, 0),
    (`f1`.`Price` + `f2`.`Price`) * 0.9,
    
    `f1`.`Destination`,
    `f1`.`Destination name`,
    `f1`.`Destination country`, 
    `f1`.`Destination city`, 
    `f1`.`Destination timezone`, 
    `f1`.`Destination longitude`, 
    `f1`.`Destination latitude`,
    
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    
    `f1`.`Arrival time`,
    `f2`.`Departure time`,
    null,
    null,
    
    `f1`.`Flight time`,
    `f2`.`Flight time`,
    null
FROM `flight_view` AS `f1`
	INNER JOIN `flight_view` AS `f2`
    	ON `f1`.`Destination` = `f2`.`Departure`
        AND TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) >= '02:00:00'
)
UNION
(
SELECT
	2,
    
	`f1`.`Flight number`,
    `f2`.`Flight number`,
    `f3`.`Flight number`,
    
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
    IF(TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) > '12:00:00' OR TIMEDIFF(`f3`.`Departure time`, `f2`.`Arrival time`) > '12:00:00', 1, 0),
    (`f1`.`Price` + `f2`.`Price` + `f3`.`Price`) * 0.8,
    
    `f2`.`Departure`,
    `f2`.`Departure name`,
    `f2`.`Departure country`,
    `f2`.`Departure city`,
    `f2`.`Departure timezone`,
    `f2`.`Departure longitude`,
    `f2`.`Departure latitude`,
    
    `f3`.`Departure`,
    `f3`.`Departure name`,
    `f3`.`Departure country`,
    `f3`.`Departure city`,
    `f3`.`Departure timezone`,
    `f3`.`Departure longitude`,
    `f3`.`Departure latitude`,
    
    `f1`.`Arrival time`,
    `f2`.`Departure time`,
    `f2`.`Arrival time`,
    `f3`.`Departure time`,
    
    `f1`.`Flight time`,
    `f2`.`Flight time`,
    `f3`.`Flight time`
FROM `flight_view` AS `f1`
	INNER JOIN `flight_view` AS `f2`
    	ON `f1`.`Destination` = `f2`.`Departure`
        AND TIMEDIFF(`f2`.`Departure time`, `f1`.`Arrival time`) >= '02:00:00'
    INNER JOIN `flight_view` AS `f3`
    	ON `f2`.`Destination` = `f3`.`Departure`
        AND TIMEDIFF(`f3`.`Departure time`, `f2`.`Arrival time`) >= '02:00:00'
        AND `f1`.`Departure` != `f3`.`Departure`
        AND `f1`.`Destination` != `f3`.`Destination`
)