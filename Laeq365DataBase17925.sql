-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: laeq_db
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_account_limits`
--

DROP TABLE IF EXISTS `admin_account_limits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_account_limits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `max_custom_checklists` int NOT NULL DEFAULT '0',
  `max_branches` int NOT NULL DEFAULT '0',
  `max_users` int NOT NULL DEFAULT '0',
  `free_onsite_inspections` int NOT NULL DEFAULT '0',
  `Arabic language support` tinyint NOT NULL DEFAULT '0',
  `Access to training programs` tinyint NOT NULL DEFAULT '0',
  `max_Corrective_action` int NOT NULL DEFAULT '0',
  `Daily monitoring sheets` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `admin_id_UNIQUE` (`admin_id`),
  KEY `admin_id_LMTS_idx` (`admin_id`),
  CONSTRAINT `admin_id_LMTS` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_account_limits`
--

LOCK TABLES `admin_account_limits` WRITE;
/*!40000 ALTER TABLE `admin_account_limits` DISABLE KEYS */;
INSERT INTO `admin_account_limits` VALUES (1,89,0,2,0,0,0,0,0,0),(2,91,0,2,0,0,0,0,0,0),(3,92,0,3,10,0,1,0,0,1),(6,95,0,1,1,0,0,0,0,0);
/*!40000 ALTER TABLE `admin_account_limits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `register_with_google` tinyint NOT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` varchar(100) NOT NULL,
  `end_date` varchar(100) NOT NULL,
  `plan_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `admin_plan_idx` (`plan_id`),
  KEY `user_id_client_idx` (`user_id`),
  CONSTRAINT `admin_plan` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_client` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (38,4,1,'IT USER TEST 1','x_VUGQSm~v',0,'2025-08-11 09:01:27','12/12/2024','12/12/2025','free'),(88,54,1,'Youssef','x_VUGQSm~v',0,'2025-08-14 19:47:27','2025-08-14T22:47:26.815Z','2025-08-28T22:47:26.815Z','14Days-free'),(89,56,1,'Kandil','p>}',0,'2025-08-19 09:11:12','2025-09-09T15:19:59.687Z','2025-10-09T15:19:59.687Z',' ⁠Basic Package\n'),(90,57,0,'kandil','x_VUGQSm~v',0,'2025-08-30 13:17:59','2025-08-30T16:17:58.781Z','2025-09-06T16:17:58.781Z','7Days-free'),(91,58,1,'Youssef','x_VUGQSm~v',0,'2025-09-09 12:47:27','2025-09-09T16:16:38.898Z','2025-10-09T16:16:38.898Z',' ⁠Basic Package\n'),(92,59,1,'Test','x_VUGQSm~v',0,'2025-09-10 05:29:55','2025-09-17T09:23:04.424Z','2025-10-17T09:23:04.424Z',' ⁠Basic Package\n'),(95,63,0,'TestThree','ysW	oa]KIXQx',0,'2025-09-10 08:19:34','2025-09-10T11:19:33.643Z','2025-09-17T11:19:33.643Z','7Days-free');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `company_id` int NOT NULL,
  `site_id` int NOT NULL,
  `asset_name` varchar(45) NOT NULL,
  `asset_category` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `model` varchar(100) NOT NULL,
  `warranty_date` varchar(20) NOT NULL,
  `last_maintenance_date` varchar(50) DEFAULT NULL,
  `next_maintenance_date` varchar(50) DEFAULT NULL,
  `color` varchar(20) NOT NULL,
  `serial_number` text NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `asset_admin_idx` (`admin_id`),
  KEY `asset_company_idx` (`company_id`),
  KEY `asset_site_idx` (`site_id`),
  CONSTRAINT `asset_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `asset_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `asset_site` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint NOT NULL DEFAULT '1',
  `provider` varchar(45) DEFAULT NULL,
  `provider_id` varchar(45) DEFAULT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklists`
--

DROP TABLE IF EXISTS `checklists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `checklist_title` varchar(100) NOT NULL,
  `admin_id` int NOT NULL,
  `owner` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklists`
--

LOCK TABLES `checklists` WRITE;
/*!40000 ALTER TABLE `checklists` DISABLE KEYS */;
INSERT INTO `checklists` VALUES (1,'test_parent_1',1,'laeq'),(2,'postmanChecklistTitleTest',1,'laeq');
/*!40000 ALTER TABLE `checklists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `main_site_id` int DEFAULT NULL,
  `company_name` varchar(45) NOT NULL,
  `sector_type` varchar(45) NOT NULL,
  `company_email` varchar(45) NOT NULL,
  `company_website` varchar(100) DEFAULT NULL,
  `comapny_logo` text,
  `company_license` text,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `companies_admin_idx` (`admin_id`),
  KEY `main_site_id_idx` (`main_site_id`),
  CONSTRAINT `companies_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `main_site_id` FOREIGN KEY (`main_site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (2,88,1,'company_name_test1','Hotel','company@email',NULL,NULL,NULL,'2025-08-11 12:30:29'),(3,88,NULL,'company_name_test2','Resturant','company@email',NULL,NULL,NULL,'2025-08-15 19:34:45'),(4,88,NULL,'company_name_test3','Resturant2','company@email',NULL,NULL,NULL,'2025-08-15 19:34:45'),(9,88,2,'c1','Supermarket','cmail',NULL,NULL,NULL,'2025-08-16 19:17:55'),(10,89,4,'COPTEST','Hotel','youssfkandil79@gmail.com',NULL,NULL,NULL,'2025-09-01 16:48:24'),(11,92,5,'co1','Hotel','iewnvci@.com',NULL,NULL,NULL,'2025-09-10 16:58:34');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `site_id` int NOT NULL,
  `dep_name` varchar(45) NOT NULL,
  `dep_description` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `dep_admin_idx` (`admin_id`),
  KEY `dep_site_idx` (`site_id`),
  CONSTRAINT `dep_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dep_site` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `admin_id` int unsigned NOT NULL,
  `role_id` int NOT NULL,
  `company_id` int NOT NULL,
  `site_id` int NOT NULL,
  `auth_id` int unsigned DEFAULT NULL,
  `full_name` varchar(45) NOT NULL,
  `job_title` varchar(45) DEFAULT NULL,
  `phone` text NOT NULL,
  `department_id` int DEFAULT NULL,
  `is_active` tinyint NOT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `emp_admin_idx` (`admin_id`),
  KEY `emp_company_idx` (`company_id`),
  KEY `emp_site_idx` (`site_id`),
  KEY `emp_auth` (`auth_id`),
  KEY `user_id_emp_idx` (`user_id`),
  KEY `emp_roles_idx` (`role_id`),
  CONSTRAINT `emp_auth` FOREIGN KEY (`auth_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `emp_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `emp_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `emp_site` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_emp` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (2,55,88,3,9,3,NULL,'new EMP','Kandil Job','01278993600',NULL,0,'2025-08-17 05:42:32'),(4,66,92,6,11,5,NULL,'Youssef','CTO','01278993600',NULL,0,'2025-09-10 17:17:13');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_name` varchar(45) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'Daily monitoring sheets','feature'),(2,'Access to training programs','feature'),(3,'Arabic language support','feature'),(4,'Branches included','limit'),(5,'Users included','limit'),(6,'Custom checklist fee','limit'),(7,'Corrective action features','feature'),(8,'Free onsite inspections','limit');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laeq_admins`
--

DROP TABLE IF EXISTS `laeq_admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laeq_admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `user_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_laeq_idx` (`user_id`),
  CONSTRAINT `user_id_laeq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laeq_admins`
--

LOCK TABLES `laeq_admins` WRITE;
/*!40000 ALTER TABLE `laeq_admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `laeq_admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(45) NOT NULL,
  `permission_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'show checklists reports',NULL),(2,'show summeries',NULL),(3,'show users',NULL),(4,'show companies',NULL),(5,'assign checklist to users',NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_features`
--

DROP TABLE IF EXISTS `plan_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `feature_id` int NOT NULL,
  `feature_value` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `details_of_plan_idx` (`plan_id`),
  KEY `features_of_plan_idx` (`feature_id`),
  CONSTRAINT `details_of_plan` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `features_of_plan` FOREIGN KEY (`feature_id`) REFERENCES `features` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_features`
--

LOCK TABLES `plan_features` WRITE;
/*!40000 ALTER TABLE `plan_features` DISABLE KEYS */;
INSERT INTO `plan_features` VALUES (2,0,4,'1'),(3,0,5,'1'),(11,1,1,'1'),(12,1,4,'3'),(13,1,5,'10'),(14,1,7,'100'),(15,3,1,'1'),(16,3,4,'7'),(17,3,5,'30'),(18,3,8,'2'),(19,5,1,'1'),(20,5,4,'20'),(21,5,5,'100'),(22,5,6,'5'),(23,5,8,'5'),(24,1,3,'1'),(25,1,7,'1'),(26,2,3,'1'),(27,2,7,'1'),(28,3,3,'1'),(29,3,7,'1'),(30,4,3,'1'),(31,4,7,'1'),(32,5,3,'1'),(33,5,7,'1'),(34,6,3,'1'),(35,6,7,'1'),(36,2,1,'1'),(37,2,4,'3'),(38,2,5,'10'),(39,4,1,'1'),(40,4,4,'7'),(41,4,5,'30'),(42,4,8,'2'),(43,6,1,'1'),(44,6,4,'20'),(45,6,5,'100'),(46,6,8,'5'),(47,6,6,'5');
/*!40000 ALTER TABLE `plan_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `is_yearly` tinyint NOT NULL DEFAULT '0',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (0,'7Days-free','0','14',-1,'2025-04-07 15:16:32'),(1,' ⁠Basic Package\n','220','30',0,'2025-04-07 15:16:32'),(2,' ⁠Basic Package ','2160','365',1,'2025-04-07 15:16:32'),(3,' ⁠Pro Package\n','540','30',0,'2025-04-07 15:16:32'),(4,' ⁠Pro Package\n','5400','365',1,'2025-04-07 15:16:32'),(5,' ⁠Enterprise Package\n','800','30',0,'2025-04-07 15:16:32'),(6,' ⁠Enterprise Package\n','7200','365',1,'2025-04-07 15:16:32');
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `price` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_answers`
--

DROP TABLE IF EXISTS `question_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `task_id` int NOT NULL,
  `question_id` int NOT NULL,
  `field_id` int NOT NULL,
  `user_id` int NOT NULL,
  `value` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `answered_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `question_id_idx` (`question_id`),
  KEY `question_id_AWS_idx` (`question_id`),
  KEY `field_id_AWS_idx` (`field_id`),
  KEY `tasks_id_AWS_idx` (`task_id`),
  KEY `admin_id_AWS_idx` (`admin_id`),
  KEY `user_id_AWS_idx` (`user_id`,`admin_id`),
  CONSTRAINT `admin_id_AWS` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `field_id_AWS` FOREIGN KEY (`field_id`) REFERENCES `question_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_id_AWS` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tasks_id_AWS` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_answers`
--

LOCK TABLES `question_answers` WRITE;
/*!40000 ALTER TABLE `question_answers` DISABLE KEYS */;
INSERT INTO `question_answers` VALUES (39,92,2,7,14,59,'1','mcq','2025-09-16 03:04:05'),(40,92,2,7,10,59,'ryhjtyj','short_text','2025-09-16 03:04:05'),(41,92,2,7,11,59,'PDFS/user_59-questionID_7-fieldID_11_1758002644194.pdf','images','2025-09-16 03:04:05'),(42,92,2,7,17,59,'2025-09-16T09:03','date_time','2025-09-16 03:04:05'),(43,92,2,7,18,59,'2025-09-14','date','2025-09-16 03:04:05'),(44,92,2,7,16,59,'{\"lat\":\"25.05295\",\"long\":\"45.67463\"}','location','2025-09-16 03:04:05'),(45,92,2,7,19,59,'signatureField/user_59-questionID_7-fieldID_19_1758002645087.webp','signature','2025-09-16 03:04:05'),(46,92,2,7,15,59,'[\"Toole 2\",\"Toole 3\"]','checkbox','2025-09-16 03:04:05'),(47,92,2,8,12,59,'3','score','2025-09-16 03:04:05'),(48,92,2,9,13,59,'13:08','time','2025-09-16 03:04:05'),(49,92,3,10,20,59,'-1','mcq','2025-09-17 08:33:23'),(50,92,3,11,21,59,'2025-09-25T00:31','date_time','2025-09-17 08:33:23'),(51,92,3,12,22,59,'[\"TypeScript\",\"Next.js\",\"Express.js\",\"prisma\"]','checkbox','2025-09-17 08:33:23'),(52,92,3,13,24,59,'5','score','2025-09-17 08:33:23'),(53,92,3,14,25,59,'signatureField/user_59-questionID_14-fieldID_25_1758108801332.webp','signature','2025-09-17 08:33:23');
/*!40000 ALTER TABLE `question_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_field_options`
--

DROP TABLE IF EXISTS `question_field_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_field_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `field_id` int NOT NULL,
  `label` varchar(45) NOT NULL,
  `value` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `field_id_options_idx` (`field_id`),
  CONSTRAINT `field_id_options` FOREIGN KEY (`field_id`) REFERENCES `question_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_field_options`
--

LOCK TABLES `question_field_options` WRITE;
/*!40000 ALTER TABLE `question_field_options` DISABLE KEYS */;
INSERT INTO `question_field_options` VALUES (1,14,'good','1'),(2,14,'bad','0'),(3,14,'N/A','-1'),(4,15,'Toole 1','1'),(5,15,'Toole 2','2'),(6,15,'Toole 3','3'),(7,15,'Toole 4','4'),(8,20,'good','1'),(9,20,'good','0'),(10,20,'not bad','-1'),(11,22,'TypeScript','TypeScript'),(12,22,'Next.js','Next.js'),(13,22,'Express.js','Express.js'),(14,22,'prisma','prisma'),(15,22,'Php','Php');
/*!40000 ALTER TABLE `question_field_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_fields`
--

DROP TABLE IF EXISTS `question_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_fields` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `question_id_idx` (`question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_fields`
--

LOCK TABLES `question_fields` WRITE;
/*!40000 ALTER TABLE `question_fields` DISABLE KEYS */;
INSERT INTO `question_fields` VALUES (10,7,'short_text'),(11,7,'images'),(12,8,'score'),(13,9,'time'),(14,7,'mcq'),(15,7,'checkbox'),(16,7,'location'),(17,7,'date_time'),(18,7,'date'),(19,7,'signature'),(20,10,'mcq'),(21,11,'date_time'),(22,12,'checkbox'),(23,12,'comment'),(24,13,'score'),(25,14,'signature');
/*!40000 ALTER TABLE `question_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_title` varchar(200) DEFAULT NULL,
  `template_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `temp_id_idx` (`template_id`),
  CONSTRAINT `temp_id` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (7,'Laeq is good',1),(8,'Rate the Template',1),(9,'what Time is it',1),(10,'Is Test Good',6),(11,'when you have finshed the app',6),(12,'what is tools you used in thise app',6),(13,'Rete The Template',6),(14,'our Sifneture',6);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `permission_idx` (`permission_id`),
  KEY `role_id_idx` (`role_id`),
  CONSTRAINT `permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,2,1),(2,2,2),(3,2,3),(4,3,1),(5,3,2),(6,3,5),(7,3,4),(8,4,1),(9,4,2),(10,4,3),(11,5,1),(12,5,2),(13,6,1),(14,6,2),(15,6,3),(28,6,4),(30,6,5);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `role_name` varchar(45) NOT NULL,
  `department_id` int DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `role_admin_idx` (`admin_id`),
  CONSTRAINT `role_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,88,'Maneger',NULL,'EMP ROLE','2025-08-15 20:37:15'),(3,88,'Super',NULL,'Super Ro;e','2025-08-15 20:57:26'),(4,88,'Emp',NULL,'Normal EMP','2025-08-15 20:59:11'),(5,89,'test Role',NULL,'testtttt','2025-09-01 06:35:25'),(6,92,'Test',NULL,'Test Role ','2025-09-10 16:57:19');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_value` varchar(100) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `company_id` int NOT NULL,
  `site_name` varchar(45) NOT NULL,
  `time_zone` varchar(45) DEFAULT NULL,
  `full_address` varchar(245) NOT NULL,
  `post_code` varchar(45) NOT NULL,
  `lat` varchar(45) NOT NULL,
  `long` varchar(45) NOT NULL,
  `site_license` varchar(45) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `site_admin_idx` (`admin_id`),
  KEY `site_company_idx` (`company_id`),
  CONSTRAINT `site_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `site_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sites`
--

LOCK TABLES `sites` WRITE;
/*!40000 ALTER TABLE `sites` DISABLE KEYS */;
INSERT INTO `sites` VALUES (1,38,2,'site_test1',NULL,'full_address -- 123 full_address','12345','134235263','1258376182',NULL,'2025-08-11 12:30:29'),(2,88,9,'s1',NULL,'3178 Imam Saud bin Faisal 6215 Al Yasmeen Dist.','13322','31.22820','29.96922',NULL,'2025-08-16 19:17:55'),(3,88,9,'s2',NULL,'ش 20 امام مجمع مدارس الظاهرية','21527','24.61237','46.71170',NULL,'2025-08-16 19:17:55'),(4,89,10,'COPTEST_SITE',NULL,'ش 20 امام مجمع مدارس الظاهرية','21527','31.22769','29.96943',NULL,'2025-09-01 16:48:24'),(5,92,11,'St1',NULL,'3178 Imam Saud bin Faisal 6215 Al Yasmeen Dist.','13322','31.22785','29.96939',NULL,'2025-09-10 16:58:34');
/*!40000 ALTER TABLE `sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `transaction_id` text NOT NULL,
  `plan_id` int NOT NULL,
  `amount` int NOT NULL,
  `subscripe_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `admin_user_id_idx` (`admin_id`),
  CONSTRAINT `admin_user_id` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (3,91,'chg_TS02A5220251615w5RM0909797',1,2640,'2025-09-09 13:16:40'),(4,92,'chg_TS01A1920250903j1ZK1709691',1,220,'2025-09-17 06:23:08');
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `super_admins`
--

DROP TABLE IF EXISTS `super_admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `super_admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id_super` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `super_admins`
--

LOCK TABLES `super_admins` WRITE;
/*!40000 ALTER TABLE `super_admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `super_admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `user_id` int NOT NULL,
  `template_id` int NOT NULL,
  `company_id` int NOT NULL,
  `site_id` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `admin_idTasks_idx` (`admin_id`),
  KEY `user_idTasks_idx` (`user_id`),
  KEY `temp_idTasks_idx` (`template_id`),
  KEY `company_idTasks_idx` (`company_id`),
  KEY `site_idTasks_idx` (`site_id`),
  CONSTRAINT `admin_idTasks` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `company_idTasks` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `site_idTasks` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `temp_idTasks` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_idTasks` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (2,92,66,1,11,5,'Completed','2025-09-11 09:22:49'),(3,92,66,6,11,5,'Completed','2025-09-17 08:27:24');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `checklist_id` int NOT NULL,
  `template_title` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `checklist_id_idx` (`checklist_id`),
  CONSTRAINT `checklist_id` FOREIGN KEY (`checklist_id`) REFERENCES `checklists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,1,'Test_Temp_1'),(2,1,'testTitlePostman'),(3,1,'TEMPLATE POSTA 1'),(4,1,'TEMPLATE POSTA 2'),(5,2,'TEMPLATE POSTA 3'),(6,1,'Youssef Questions');
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'u1@gmail.com','1234','emp','2025-08-09 12:59:47'),(4,'string','p>}','admin','2025-08-11 09:01:27'),(54,'t@gmail.com','	vX81/%*4 ','admin','2025-08-14 19:47:27'),(55,'new@gmail.com','1234','employee','2025-08-17 05:42:32'),(56,'k@gmial.com','	vX%*4 =','admin','2025-08-19 09:11:12'),(57,'t2@gmail.com','	vX%*4 =','admin','2025-08-30 13:17:59'),(58,'youssef@gmail.com','	vX%*4 =','admin','2025-09-09 12:47:27'),(59,'Test@Gmail.com','	vX%*4 =','admin','2025-09-10 05:29:55'),(61,'TestTwo@Gmail.com','�E50&$B','admin','2025-09-10 07:22:18'),(63,'TestThree@Gmail.com','�E50&$B','admin','2025-09-10 08:19:34'),(66,'emp@gmail.com','	vX%*4 ','employee','2025-09-10 17:17:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-17 14:45:12
