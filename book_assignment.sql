-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2025 at 10:32 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_assignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `assigned_to` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT 'https://via.placeholder.com/150',
  `time_of_issue` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `assigned_to`, `image_url`, `time_of_issue`) VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Meenu', 'https://m.media-amazon.com/images/I/71X7HnBk6VL._UF1000,1000_QL80_.jpg', '2025-01-11 10:19:21'),
(3, 'To Kill a Mockingbird', 'Harper Lee', 'Vikru', 'https://m.media-amazon.com/images/I/811NqsxadrS._AC_UF1000,1000_QL80_.jpg', '2025-01-11 08:07:40'),
(4, 'Pride and Prejudice', 'Jane Austen', 'Kutty', 'https://m.media-amazon.com/images/I/81Scutrtj4L._UF1000,1000_QL80_.jpg', '2025-01-11 08:07:46'),
(5, 'The Hobbit', 'J.R.R. Tolkien', 'Poochu', 'https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg', '2025-01-11 08:07:54'),
(6, 'The Catcher in the Rye', 'J.D. Salinger', 'Pipilu', 'https://m.media-amazon.com/images/I/91fQEUwFMyL.jpg', '2025-01-11 08:08:01'),
(7, 'Brave New World', 'Aldous Huxley', NULL, 'https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg', NULL),
(8, 'Animal Farm', 'George Orwell', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxd3OfKXeVAtq4dhgHPzIdkyGs2Tp890UvGg&s', NULL),
(9, 'The Shining', 'Stephen King', NULL, 'https://upload.wikimedia.org/wikipedia/commons/0/09/The_Shining_%281977%29_front_cover%2C_first_edition.jpg', NULL),
(11, 'The Lord of the Rings', 'J.R.R. Tolkien', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEi_bbDpIhsmWV-G1MtmXbOhjiTjKauBdOKQ&s', NULL),
(12, 'Yakshi', 'Malayattoor Ramakrishnan', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTywoLRgVkUnIHji30CEiKSk1F2P9UjtLeV-A&s', NULL),
(14, 'harry potter and the philosopher\'s stone', 'J. K. Rowling', NULL, 'https://m.media-amazon.com/images/I/81m9fP+LIPL._UF1000,1000_QL80_.jpg', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
