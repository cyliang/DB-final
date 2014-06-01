-- phpMyAdmin SQL Dump
-- version 4.2.2
-- http://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生時間： 2014 年 06 月 01 日 22:06
-- 伺服器版本: 5.6.17
-- PHP 版本： 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 資料庫： `cyliang_db`
--

-- --------------------------------------------------------

--
-- 資料表結構 `Airport`
--

DROP TABLE IF EXISTS `Airport`;
CREATE TABLE IF NOT EXISTS `Airport` (
  `IATA` varchar(5) NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `latitude` decimal(8,6) NOT NULL,
  `City` varchar(255) NOT NULL,
  `Timezone` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表新增前先清除舊資料 `Airport`
--

TRUNCATE TABLE `Airport`;
--
-- 資料表的匯出資料 `Airport`
--

INSERT INTO `Airport` (`IATA`, `Name`, `longitude`, `latitude`, `City`, `Timezone`) VALUES
('DOH', 'Doha International Airport', '51.565000', '25.261111', 'Doha', '+04:00'),
('HKG', 'Hong Kong International Airport', '113.914444', '22.308889', 'Hong Kong', '+08:00'),
('HND', 'Tokyo International Airport', '139.781111', '35.553333', 'Tokyo', '+09:00'),
('KHH', 'kaohsiung International Airport', '120.350000', '22.576944', 'Kaohsiung', '+08:00'),
('LCY', 'London City Airport', '0.055278', '51.505278', 'London', '+00:00'),
('LED', 'Aeroport Pulkovo', '30.262500', '59.800278', 'Saint Petersburg', '+04:00'),
('LHR', 'London Heathrow Airport', '-0.461389', '51.477500', 'London', '+00:00'),
('LTN', 'London Luton Airport', '-0.368333', '51.874722', 'London', '+00:00'),
('MAN', 'Manchester Airport', '-2.275000', '53.353889', 'Manchester', '+00:00'),
('NGO', 'Chūbu Centrair International Airport', '136.805278', '34.858333', 'Nagoya', '+09:00'),
('NRT', 'Narita International Airport', '140.385556', '35.765278', 'Tokyo', '+09:00'),
('SIN', 'Singapore International Airport', '103.989444', '1.359167', 'Singapore', '+08:00'),
('TCH', 'Taichung Airport', '120.620581', '24.264667', 'Taichung', '+08:00'),
('TPE', 'Taipei Touyuan International Airport', '121.223889', '25.076389', 'Taipei', '+08:00');

-- --------------------------------------------------------

--
-- 資料表結構 `City`
--

DROP TABLE IF EXISTS `City`;
CREATE TABLE IF NOT EXISTS `City` (
  `Name` varchar(255) NOT NULL,
  `Country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表新增前先清除舊資料 `City`
--

TRUNCATE TABLE `City`;
--
-- 資料表的匯出資料 `City`
--

INSERT INTO `City` (`Name`, `Country`) VALUES
('Hong Kong', 'China'),
('Doha', 'Doha'),
('Nagoya', 'Japan'),
('Tokyo', 'Japan'),
('Saint Petersburg', 'Russian Federation'),
('Singapore', 'Singapore'),
('Kaohsiung', 'Taiwan'),
('Taichung', 'Taiwan'),
('Taipei', 'Taiwan'),
('London', 'United Kingdom'),
('Manchester', 'United State');

-- --------------------------------------------------------

--
-- 資料表結構 `Country`
--

DROP TABLE IF EXISTS `Country`;
CREATE TABLE IF NOT EXISTS `Country` (
  `Name` varchar(255) NOT NULL,
  `Abbreviation` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表新增前先清除舊資料 `Country`
--

TRUNCATE TABLE `Country`;
--
-- 資料表的匯出資料 `Country`
--

INSERT INTO `Country` (`Name`, `Abbreviation`) VALUES
('China', 'CN'),
('Doha', 'DOH'),
('Japan', 'JP'),
('Russian Federation', 'RUS'),
('Singapore', 'SIN'),
('Taiwan', 'TWN'),
('United Kingdom', 'UK'),
('United State', 'US');

-- --------------------------------------------------------

--
-- 資料表結構 `Favorite`
--

DROP TABLE IF EXISTS `Favorite`;
CREATE TABLE IF NOT EXISTS `Favorite` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `flight_id1` int(11) NOT NULL,
  `flight_id2` int(11) DEFAULT NULL,
  `flight_id3` int(11) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 資料表新增前先清除舊資料 `Favorite`
--

TRUNCATE TABLE `Favorite`;
--
-- 資料表的匯出資料 `Favorite`
--

INSERT INTO `Favorite` (`id`, `user_id`, `flight_id1`, `flight_id2`, `flight_id3`) VALUES
(6, 28, 17, 4, NULL),
(5, 28, 18, 29, 4),
(4, 28, 18, 32, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `Flight`
--

DROP TABLE IF EXISTS `Flight`;
CREATE TABLE IF NOT EXISTS `Flight` (
`id` int(11) NOT NULL,
  `Flight_number` varchar(255) NOT NULL,
  `Departure` varchar(5) NOT NULL,
  `Destination` varchar(5) NOT NULL,
  `Departure_time` datetime NOT NULL,
  `Arrival_time` datetime NOT NULL,
  `Price` decimal(8,2) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

--
-- 資料表新增前先清除舊資料 `Flight`
--

TRUNCATE TABLE `Flight`;
--
-- 資料表的匯出資料 `Flight`
--

INSERT INTO `Flight` (`id`, `Flight_number`, `Departure`, `Destination`, `Departure_time`, `Arrival_time`, `Price`) VALUES
(4, 'JP-123', 'TPE', 'HND', '2014-05-01 10:00:00', '2014-05-01 12:00:00', '6000.00'),
(5, 'TM-123', 'TPE', 'MAN', '2014-05-01 10:00:00', '2014-05-01 19:00:00', '20000.00'),
(6, 'TH-123', 'TPE', 'HKG', '2014-05-01 10:00:00', '2014-05-01 11:30:00', '4000.00'),
(7, 'THK-123', 'TPE', 'HKG', '2014-05-01 13:00:00', '2014-05-01 20:22:00', '13000.00'),
(8, 'JP-124', 'TPE', 'NGO', '2014-04-13 09:00:00', '2014-04-13 12:27:00', '1200.00'),
(9, 'HG-128', 'TPE', 'HKG', '2014-04-15 06:10:00', '2014-04-15 07:41:00', '2980.00'),
(10, 'HK-228', 'KHH', 'HKG', '2014-04-16 14:20:00', '2014-04-16 15:51:00', '6000.00'),
(11, 'HN-225', 'KHH', 'HND', '2014-04-10 12:17:00', '2014-04-10 16:44:00', '3998.00'),
(12, 'HK-328', 'TCH', 'HKG', '2014-04-10 15:22:00', '2014-04-10 16:53:00', '3500.00'),
(13, 'SI-327', 'TCH', 'SIN', '2014-04-27 10:00:00', '2014-04-27 14:10:00', '8000.00'),
(14, 'HN-325', 'TCH', 'HND', '2014-04-16 14:20:00', '2014-04-16 18:27:00', '6999.00'),
(15, 'DH-429', 'NGO', 'DOH', '2014-04-20 12:00:00', '2014-04-20 19:00:00', '20000.00'),
(16, 'LC-413', 'NGO', 'LCY', '2014-04-20 10:00:00', '2014-04-20 14:00:00', '21355.00'),
(17, 'TP-421', 'NGO', 'TPE', '2014-04-30 17:00:00', '2014-04-30 19:27:00', '5123.00'),
(18, 'HK-428', 'NGO', 'HKG', '2014-04-21 11:07:00', '2014-04-21 14:07:00', '6543.00'),
(19, 'JPM-123', 'HND', 'MAN', '2014-05-01 14:00:00', '2014-05-01 23:00:00', '15000.00'),
(20, 'JHK-123', 'HND', 'HKG', '2014-05-01 15:08:00', '2014-05-01 19:00:00', '12000.00'),
(21, 'TP-521', 'HND', 'TPE', '2014-04-24 10:00:00', '2014-04-24 13:07:00', '1630.00'),
(22, 'NR-526', 'HND', 'NRT', '2014-04-15 10:15:00', '2014-04-15 11:16:00', '1980.00'),
(23, 'KH-722', 'SIN', 'KHH', '2014-04-29 16:13:00', '2014-04-29 20:23:00', '12377.00'),
(24, 'JP-725', 'SIN', 'HND', '2014-04-17 06:00:00', '2014-04-17 13:00:00', '4830.00'),
(25, 'HK-728', 'SIN', 'HKG', '2014-04-18 07:25:00', '2014-04-18 11:07:00', '13333.00'),
(26, 'TP-721', 'SIN', 'TPE', '2014-05-01 17:01:00', '2014-05-01 21:32:00', '16875.00'),
(27, 'HKD-123', 'HKG', 'DOH', '2014-05-01 15:00:00', '2014-05-01 23:00:00', '10000.00'),
(28, 'SI-827', 'HKG', 'SIN', '2014-04-13 17:00:00', '2014-04-13 20:42:00', '16999.00'),
(29, 'TP-821', 'HKG', 'TPE', '2014-04-23 10:50:00', '2014-04-23 12:21:00', '6111.00'),
(30, 'TP-822', 'HKG', 'KHH', '2014-05-01 12:00:00', '2014-05-01 13:35:00', '3999.00'),
(31, 'LE-814', 'HKG', 'LED', '2014-04-20 13:00:00', '2014-04-20 19:00:00', '16875.00'),
(32, 'TC-823', 'HKG', 'TCH', '2014-04-26 10:12:00', '2014-04-26 11:47:00', '4895.00'),
(33, 'DM-123', 'DOH', 'MAN', '2014-05-02 02:00:00', '2014-05-02 06:30:00', '8000.00'),
(34, 'SI-927', 'DOH', 'SIN', '2014-04-25 10:00:00', '2014-04-25 20:15:00', '19387.00'),
(35, 'HG-148', 'LED', 'HKG', '2014-04-27 09:00:00', '2014-04-27 22:07:00', '14960.00'),
(36, 'NR-146', 'LED', 'NRT', '2014-04-25 04:00:00', '2014-04-25 19:32:00', '17992.00');

-- --------------------------------------------------------

--
-- 資料表結構 `Flight_comment`
--

DROP TABLE IF EXISTS `Flight_comment`;
CREATE TABLE IF NOT EXISTS `Flight_comment` (
`id` int(11) NOT NULL,
  `Content` text CHARACTER SET utf8 NOT NULL,
  `Datetime` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `flight_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- 資料表新增前先清除舊資料 `Flight_comment`
--

TRUNCATE TABLE `Flight_comment`;
-- --------------------------------------------------------


--
-- 資料表結構 `Seat`
--

DROP TABLE IF EXISTS `Seat`;
CREATE TABLE IF NOT EXISTS `Seat` (
`id` int(11) NOT NULL,
  `Seat_Number` varchar(30) NOT NULL,
  `Buy_Datetime` datetime NOT NULL,
  `Flight_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- 資料表新增前先清除舊資料 `Seat`
--

TRUNCATE TABLE `Seat`;
-- --------------------------------------------------------


--
-- 資料表結構 `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
`id` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `power` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- 資料表新增前先清除舊資料 `User`
--

TRUNCATE TABLE `User`;
--
-- 資料表的匯出資料 `User`
--

INSERT INTO `User` (`id`, `email`, `password`, `Name`, `power`) VALUES
(27, 'stu89424@gmail.com', '$2y$10$PSDqqf8MRBq6tZ1lv8akVOrcd45nR/SE.cHDa3DL5xz2ZHzJSCBTi', 'Chih-Yung Liang', 1),
(28, 'linym@cs.nctu.edu.tw', '$2y$10$0NlhF/hHoCBHHl5Oq.ax0eFGx48HWenFDZkwBcx7QW9/4rzWn7gR.', 'You-Min Lin', 0);

-- --------------------------------------------------------

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `Airport`
--
ALTER TABLE `Airport`
 ADD PRIMARY KEY (`IATA`), ADD KEY `City` (`City`);

--
-- 資料表索引 `City`
--
ALTER TABLE `City`
 ADD PRIMARY KEY (`Name`), ADD KEY `Country` (`Country`);

--
-- 資料表索引 `Country`
--
ALTER TABLE `Country`
 ADD PRIMARY KEY (`Name`), ADD UNIQUE KEY `Abbreviation` (`Abbreviation`);

--
-- 資料表索引 `Favorite`
--
ALTER TABLE `Favorite`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`,`flight_id1`,`flight_id2`,`flight_id3`), ADD KEY `flight_id1` (`flight_id1`), ADD KEY `flight_id2` (`flight_id2`), ADD KEY `flight_id3` (`flight_id3`);

--
-- 資料表索引 `Flight`
--
ALTER TABLE `Flight`
 ADD PRIMARY KEY (`id`), ADD KEY `departure` (`Departure`,`Destination`), ADD KEY `destination` (`Destination`);

--
-- 資料表索引 `Flight_comment`
--
ALTER TABLE `Flight_comment`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`,`flight_id`), ADD KEY `flight_id` (`flight_id`);

--
-- 資料表索引 `Seat`
--
ALTER TABLE `Seat`
 ADD PRIMARY KEY (`id`), ADD KEY `Flight_id` (`Flight_id`,`User_id`), ADD KEY `User_id` (`User_id`);

--
-- 資料表索引 `User`
--
ALTER TABLE `User`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `Favorite`
--
ALTER TABLE `Favorite`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- 使用資料表 AUTO_INCREMENT `Flight`
--
ALTER TABLE `Flight`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- 使用資料表 AUTO_INCREMENT `Flight_comment`
--
ALTER TABLE `Flight_comment`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `Seat`
--
ALTER TABLE `Seat`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `User`
--
ALTER TABLE `User`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `Airport`
--
ALTER TABLE `Airport`
ADD CONSTRAINT `Airport_ibfk_1` FOREIGN KEY (`City`) REFERENCES `City` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `City`
--
ALTER TABLE `City`
ADD CONSTRAINT `City_ibfk_1` FOREIGN KEY (`Country`) REFERENCES `Country` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `Favorite`
--
ALTER TABLE `Favorite`
ADD CONSTRAINT `Favorite_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Favorite_ibfk_1` FOREIGN KEY (`flight_id1`) REFERENCES `Flight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Favorite_ibfk_5` FOREIGN KEY (`flight_id2`) REFERENCES `Flight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Favorite_ibfk_6` FOREIGN KEY (`flight_id3`) REFERENCES `Flight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `Flight`
--
ALTER TABLE `Flight`
ADD CONSTRAINT `Flight_ibfk_1` FOREIGN KEY (`Departure`) REFERENCES `Airport` (`IATA`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Flight_ibfk_2` FOREIGN KEY (`Destination`) REFERENCES `Airport` (`IATA`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `Flight_comment`
--
ALTER TABLE `Flight_comment`
ADD CONSTRAINT `Flight_comment_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `Flight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Flight_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `Seat`
--
ALTER TABLE `Seat`
ADD CONSTRAINT `Seat_ibfk_1` FOREIGN KEY (`Flight_id`) REFERENCES `Flight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Seat_ibfk_2` FOREIGN KEY (`User_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
