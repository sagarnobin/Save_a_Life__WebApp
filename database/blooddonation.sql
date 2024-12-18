-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2024 at 07:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blooddonation`
--

-- --------------------------------------------------------

--
-- Table structure for table `donationcenter`
--

CREATE TABLE `donationcenter` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `city` varchar(20) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donationcenter`
--

INSERT INTO `donationcenter` (`id`, `name`, `contactNo`, `city`, `latitude`, `longitude`) VALUES
(1, 'Rajshahi Blood Bank and Transfusion Center', '01770-807108', 'Rajshahi', 24.3699, 88.5813),
(3, 'Blood Bank, Rajshahi Medical College', '01797-563375', 'Rajshahi', 24.3679, 88.5653),
(5, 'Quantum Foundation Rajshahi Center', '01914-999446', 'Rajshahi', 24.3725, 88.5769),
(6, 'Sandhani RMC unit', '01709001936', 'Rajshahi', 24.3707, 88.5854),
(7, 'Blood Bank, Red Criscent Rajshahi City', '01770-330400', 'Rajshahi', 24.3678, 88.5911),
(8, 'New Safe Blood Bank', '01740-384078', 'Rajshahi', 24.373, 88.5753),
(9, 'Dhaka Blood Bank & Transfusion Center', '01681828322', 'Dhaka', 23.75, 90.3843),
(10, 'MUKTI BLOOD BANK', '01764971811', 'Dhaka', 23.7483, 90.3843),
(11, 'Digital Blood Bank & Transfusion Centre', '01793441616', 'Tangail', 24.2661, 89.9248);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `bloodGroup` text NOT NULL,
  `lastDonate` int(11) NOT NULL,
  `city` varchar(20) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `password` varchar(80) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `lastDonationDate` date GENERATED ALWAYS AS (`timestamp` - interval `lastDonate` day) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `name`, `email`, `contactNo`, `bloodGroup`, `lastDonate`, `city`, `latitude`, `longitude`,`password`, `timestamp`) VALUES
(15, 'Jimmy Carter', 'jimmy@gmail.com', '22334455661', 'A+', 15, 'Dhaka', 24.3658, 88.6241, '$2b$10$3g4EzBgUQlZnp0H2RuMiauMSifJu7TeyI8DJk4xyB/42ocHhuNsgy', '2024-12-02'),
(17, 'Sophie adam', 'sophie@gmail.com', '09128734656', 'A+', 45, 'Dhaka', 24.3658, 88.6241, '$2b$10$aZifFoOFCrHe2ARHF3BpN.BlO2cyZZoL70JMbHQ9swRdohIz/V0vS', '2024-12-02'),
(18, 'Abir Hasan ', 'hasan@gmail.com', '22334455116', 'B-', 15, 'Chittagong', 24.3658, 88.6241,'$2b$10$MVt5Mk6ETmXe8zON42u4lO.2AYxnCr6unmXlAU3cYVKU8iHzKjD6m', '2024-12-02'),
(19, 'Mellisa', 'mellisa@gmail.com', '46372865467', 'A+', 45, 'Jessore', 24.3658, 88.6241, '$2b$10$MVm/VkVK.DuGR2TB5YHhE.lId6dAQ0yc3r.CK7Y7QQWeA2tXQZqJa', '2024-12-02'),
(20, 'Charles', 'lecrec@gmail.com', '66447733876', 'A+', 90, 'Dhaka', 24.3658, 88.6241,'$2b$10$XIZXUwtKp/UgFIug8dTkXe5Poma4/fo6XRAW0iMAhzu2TxOocUIG6', '2024-12-03'),
(21, 'Lewis', 'hamilton@gmail.com', '65678567654', 'A+', 90, 'Dhaka', 23.75, 89.5753,'$2b$10$KudX9P150h4Xek4W0StHxOTWoVJ626RjvTP54ZokTwHRHwTrua0yi', '2024-12-03'),
(22, 'Marry Chris', 'marry@gmail.com', '65678765459', 'A-', 90, 'Chittagong', 24.3658, 88.6241, '$2b$10$cWCxcIjVJ1z7qf3bGHwjiOuL8PzaHgFgMMvGOxYQEi19aYxsKtLAW', '2024-12-07'),
(23, 'Dannie ', 'avril@gmail.com', '76564545454', 'A-', 90, 'Hobiganj', 24.3672, 88.6241,'$2b$10$kK2oUPjl7sWYaoyd4aD5kulHBpywMQt5ptZEQpdZdNGVAkDgporey', '2024-12-10'),
(24, 'Hannah Bekar', 'hannah@gmail.com', '34434554434', 'A-', 15, 'NewYork', 24.3672, 88.6241, '$2b$10$3L4MXkJoNs1g4x3Ezl223.vLTYtxmhHYlY98/Jji62TqS9iUucQw6', '2024-12-11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donationcenter`
--
ALTER TABLE `donationcenter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`,`email`,`contactNo`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD UNIQUE KEY `unique_contactNo` (`contactNo`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donationcenter`
--
ALTER TABLE `donationcenter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
