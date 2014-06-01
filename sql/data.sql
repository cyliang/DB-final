-- phpMyAdmin SQL Dump
-- version 4.2.2
-- http://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生時間： 2014 年 06 月 01 日 22:07
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
