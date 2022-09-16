-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: zodiac
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `appointment_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `astro_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `isDone` int(1) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `user_id` (`user_id`),
  KEY `astro_id` (`astro_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`astro_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES ('0t0M4sB7lz6UmpWjQETUC','v8orPVzKCY8ui2-Z4ziwn','q7VdhNu4V4zUlgHoukPJC','2021-03-21 04:30:00','2021-03-21 06:30:00',0),('chasgha','v8orPVzKCY8ui2-Z4ziwn','q7VdhNu4V4zUlgHoukPJC','2021-03-21 10:00:00','2021-03-21 12:00:00',0),('test_id','alexcooper221b@gmail.com','q7VdhNu4V4zUlgHoukPJC','2021-03-21 10:00:00','2021-03-21 12:00:00',0);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AstrologerCount` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('Career',10),('Business',10),('Investment',10),('Love',10),('Marriage',10),('Health',10);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BirthDateTime` datetime DEFAULT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int(11) DEFAULT 0,
  `firebase_uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('testfirebaseucdeserid11','$2a$08$PYbJ3BNAdGeSU0My/aK1euyvSi.g2X/Ayj7U4NXLiZHk3baYuzbHO','Alex Cooper','2020-01-01 10:10:10','SuperUser',0,NULL,'1nS_uFzabI5vY5qO_dcWL','1nS_uFzabI5vY5qO_dcWL'),('alexcooper221b11','$2a$08$mN2Cdz2tkdLzDcnFcpda3.0vTpUZKnlUbMiFc6skqsa60ilXP.C6a','Alex','2020-01-01 10:10:10','SuperUser',0,NULL,'alexcooper221b@gmail.com','alexcooper221b@gmail.com'),('ngmtFlU2D6O5C7tTVCC2VOYYx1u2','$2a$08$uMy8JlZnJHW/5aiP09DTuuMuM5cINUtyfThrjNb4bdiNH1aidyxpm','Damon Salvator','2021-04-29 07:40:00','07:40 AM',0,NULL,'damonsalvatormf1864@gmail.com','damonsalvatormf1864@gmail.com'),('ghg12121hg','$2a$08$hE8ZcG5KKr6iBU6OEc1CLeui/3bqJQliVvnCOYcPvekevZFwshxTS','Alex Cooper','2020-01-01 10:10:10','Astrologer',0,NULL,'q7VdhNu4V4zUlgHoukPJC','q7VdhNu4V4zUlgHoukPJC'),('qcpy2y0VyjQVG6VX4HwYX8ukAZJ2','$2a$08$oAV9zs8BhweDcRENcBuUg.yXC273cAfDZduUX6Pb.u4JrK6.huin2','shivanshu sharma','2021-04-29 08:15:00','08:15 AM',0,NULL,'shivanshu@gmai.com','shivanshu@gmai.com'),('alexcooper221b','$2a$08$p8wPYoOyLOt4AVBsPBCpj.0l9FZy3gfLmciaanZ6k3pZQA/BFOoI2','Alex','2020-01-01 10:10:10','SuperUser',0,NULL,'test@gmail.com','test@gmail.com'),('testfirebaseuserid','$2a$08$jQ1Hdycvp8HfRZUc1pw0seC4a5oK5gJZPPuo3t8KOW7QILoJTz78m','Alex','2020-01-01 10:10:10','SuperUser',0,NULL,'test1@gmail.com','test1@gmail.com'),('testfirebaseuserid11','$2a$08$2onO.ve4Q4CoLf/AQhVww.NUoJ8GOufRYyIVAgf4D0pQqEPxng/6i','Alex','2020-01-01 10:10:10','SuperUser',0,NULL,'test4@gmail.com','test4@gmail.com'),('testUserDex','$2a$08$MegG8hK6UUtO28ahM3.h1eDXFqAz848MG9ctS9j.9g4UOAWRxweVe','Yogiraj H','2020-01-01 10:10:10','Admin',0,NULL,'v8orPVzKCY8ui2-Z4ziwn','test@dexteroot.ml'),('ghghg','$2a$08$yb4PT5dTkulnTQYh7SYcheTmB92clq1j3Y16.50t0ltCWtkxtLMOq','Alex Cooper','2020-01-01 10:10:10','SuperUser',0,NULL,'YTcyz4oFdpFCAzLVzfsD4','YTcyz4oFdpFCAzLVzfsD4');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-30 13:44:58
