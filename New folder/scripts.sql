CREATE DATABASE  IF NOT EXISTS `dec19` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dec19`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: dec19
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `assignprojectstomodellers`
--

DROP TABLE IF EXISTS `assignprojectstomodellers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignprojectstomodellers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` varchar(50) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `modeller` varchar(255) NOT NULL,
  `assigned_by` varchar(255) NOT NULL,
  `date_of_assignment` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(255) DEFAULT NULL,
  `checklist` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignprojectstomodellers`
--

LOCK TABLES `assignprojectstomodellers` WRITE;
/*!40000 ALTER TABLE `assignprojectstomodellers` DISABLE KEYS */;
INSERT INTO `assignprojectstomodellers` VALUES (2,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE.ifc','Athira','Induja','2024-08-07 18:18:54','Submitted','D:\\nginx-2\\dec19\\uploads\\20240807234854_PATEL_ROAD_PUMP_HOUSE_SUMMARY.docx'),(3,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE MEP.ifc','Akash','Induja','2024-08-07 18:19:41','Submitted','D:\\nginx-2\\dec19\\uploads\\20240807234941_PATEL_ROAD_PUMP_HOUSE_SUMMARY.docx'),(5,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE MEP.rvt','Sajmeen','Induja','2024-08-07 18:24:59','Submitted','D:\\nginx-2\\dec19\\uploads\\20240807235459_20240806124831_Check_List.pdf'),(6,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE.rvt','Harshal','Induja','2024-08-07 18:26:29','Submitted','D:\\nginx-2\\dec19\\uploads\\20240807235629_KFAA_QAQC_ARC.pdf'),(7,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE.rvt','Harshal','Induja','2024-08-08 04:39:13','Reassign',NULL),(15,'VB-0081','GENESIS TOWER','ES-28-032183_RT_MADRID SAN FRANCISCO DE SALES 36 ATW_32183.rvt','Allson','Raj Sanghani','2024-08-08 10:29:11','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808155911_20240806124831_Check_List.pdf'),(16,'VB-0081','GENESIS TOWER','ES-28-032183_RT_MADRID SAN FRANCISCO DE SALES 36 ATW_32184.rvt','Abhiyuktha','Raj Sanghani','2024-08-08 10:34:47','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808160447_ESEC_QAQC.pdf'),(18,'VB-0081','GENESIS TOWER','ES-03-055765_RT_COX ATW_55767.rvt','Ibrahim','Raj Sanghani','2024-08-08 10:50:58','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808162058_20240806124831_Check_List.pdf'),(19,'VB-0081','GENESIS TOWER','ES-03-055765_RT_COX ATW_55765.rvt','Roshith Kumar','Raj Sanghani','2024-08-08 10:54:28','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808162428_20240806124831_Check_List.pdf'),(20,'VB-0081','GENESIS TOWER','ES-03-055765_RT_COX ATW_55767.rvt','Ibrahim','Raj Sanghani','2024-08-08 10:58:32','Reassign',NULL),(21,'VB-0059','CHANGI AIRPORT','TL_L3_EP221230J.RCP','Karthikeyan','Sureshkumar','2024-08-08 11:18:42','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808164842_ESEC_QAQC.pdf'),(22,'VB-0059','CHANGI AIRPORT','TL_L3_MB221223L-2BCL.RCP','Roshith Kumar','Sureshkumar','2024-08-08 11:17:50','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808164750_KFAA_QAQC_ARC.pdf'),(23,'VB-0059','CHANGI AIRPORT','TL_L3_WP_221230J-1.RCP','Akash','Sureshkumar','2024-08-08 11:37:30','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808170730_20240806124831_Check_List.pdf'),(24,'VB-0059','CHANGI AIRPORT','TL_L3_WP_20515L.RCP(MEP)','Sunil Kumar','Sureshkumar','2024-08-08 11:16:44','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808164644_KFAA_QAQC_ARC.pdf'),(25,'VB-0059','CHANGI AIRPORT','TL_L3_MB_230731L_NEW.RCP','Srinithiyan','Sureshkumar','2024-08-08 11:15:29','Submitted','D:\\nginx-2\\dec19\\uploads\\20240808164529_20240806124831_Check_List.pdf'),(26,'VB-0059','CHANGI AIRPORT','TL_L3_WP_20515L.RCP(MEP)','Sunil Kumar','Sureshkumar','2024-08-08 11:31:06','Reassign',NULL),(28,'VB-0055','Bryder Project Floor Planner','Bryder Project Floor.rvt','Shaahid','Parivendhan','2024-08-09 08:28:05','Submitted','D:\\nginx-2\\dec19\\uploads\\20240809135805_A_E_facade_Facade__Section.pdf'),(29,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors1.rvt','Mohammed Rayeez','Parivendhan','2024-08-09 08:27:28','Submitted','D:\\nginx-2\\dec19\\uploads\\20240809135728_832_QC_COMMENTS_A_E.pdf'),(30,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors2.rvt','Cedric','Parivendhan','2024-08-09 08:26:44','Submitted','D:\\nginx-2\\dec19\\uploads\\20240809135644_A_E_facade_Facade__Section.pdf'),(31,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors3.rvt','Shakil','Parivendhan','2024-08-09 08:25:56','Submitted','D:\\nginx-2\\dec19\\uploads\\20240809135556_22011_QC_COMMENTS_D_E.pdf'),(32,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors3.rvt','Shakil','Parivendhan','2024-08-09 08:37:31','Reassign',NULL);
/*!40000 ALTER TABLE `assignprojectstomodellers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignprojectstotl`
--

DROP TABLE IF EXISTS `assignprojectstotl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignprojectstotl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` text NOT NULL,
  `project_name` text NOT NULL,
  `team_leader` text NOT NULL,
  `status` text NOT NULL,
  `date_submission` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_by` text NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignprojectstotl`
--

LOCK TABLES `assignprojectstotl` WRITE;
/*!40000 ALTER TABLE `assignprojectstotl` DISABLE KEYS */;
INSERT INTO `assignprojectstotl` VALUES (3,'VB-0050','Patel Road Pump House','Induja','Input','2024-08-07 18:07:20','Jayaprakash',NULL),(4,'VB-0081','GENESIS TOWER','Raj Sanghani','Input','2024-08-08 07:17:19','Praveen',NULL),(5,'VB-0059','CHANGI AIRPORT','Sureshkumar','Input','2024-08-08 11:03:48','Jayaprakash',NULL),(6,'VB-0055','Bryder Project Floor Planner','Parivendhan','Input','2024-08-09 07:54:44','Praveen',NULL);
/*!40000 ALTER TABLE `assignprojectstotl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `modeller_performance_view`
--

DROP TABLE IF EXISTS `modeller_performance_view`;
/*!50001 DROP VIEW IF EXISTS `modeller_performance_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `modeller_performance_view` AS SELECT 
 1 AS `ModellerFirstName`,
 1 AS `ProjectID`,
 1 AS `ProjectName`,
 1 AS `Filename`,
 1 AS `Status`,
 1 AS `DateAssigned`,
 1 AS `SubmissionDate`,
 1 AS `CompletionDate`,
 1 AS `Score`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `project_dashboard`
--

DROP TABLE IF EXISTS `project_dashboard`;
/*!50001 DROP VIEW IF EXISTS `project_dashboard`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `project_dashboard` AS SELECT 
 1 AS `ProjectID`,
 1 AS `ProjectName`,
 1 AS `TeamLeader`,
 1 AS `ProjectStatus`,
 1 AS `Filename`,
 1 AS `DateSubmission`,
 1 AS `AssignedBy`,
 1 AS `Modeller`,
 1 AS `ModellerStatus`,
 1 AS `DateOfAssignment`,
 1 AS `SubmissionID`,
 1 AS `SubmissionFile`,
 1 AS `SubmittedModeller`,
 1 AS `QCPerson`,
 1 AS `AdditionalNotes`,
 1 AS `Score`,
 1 AS `QCReview`,
 1 AS `UploadPhoto`,
 1 AS `SubmissionDate`,
 1 AS `SubmissionStatus`,
 1 AS `ReportID`,
 1 AS `ReportFile`,
 1 AS `ReportModeller`,
 1 AS `ReportQCPerson`,
 1 AS `ReportScore`,
 1 AS `ReportQCReview`,
 1 AS `ReportUploadPhoto`,
 1 AS `ReportStatus`,
 1 AS `ReportDateOfCompletion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `project_status_view`
--

DROP TABLE IF EXISTS `project_status_view`;
/*!50001 DROP VIEW IF EXISTS `project_status_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `project_status_view` AS SELECT 
 1 AS `ProjectID`,
 1 AS `ProjectName`,
 1 AS `Modeller`,
 1 AS `Filename`,
 1 AS `Status`,
 1 AS `DateAssigned`,
 1 AS `SubmissionDate`,
 1 AS `CompletionDate`,
 1 AS `Score`,
 1 AS `QCReview`,
 1 AS `QCPerson`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `qc_reports`
--

DROP TABLE IF EXISTS `qc_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qc_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proj_id` varchar(100) NOT NULL,
  `project` varchar(100) NOT NULL,
  `file` varchar(100) NOT NULL,
  `submitted_modeller` varchar(100) NOT NULL,
  `qc_person` varchar(100) NOT NULL,
  `assigned_by` varchar(100) NOT NULL,
  `additional_notes` text,
  `score` int NOT NULL,
  `qc_review` text,
  `upload_photo` varchar(200) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'completed',
  `date_of_completion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qc_reports`
--

LOCK TABLES `qc_reports` WRITE;
/*!40000 ALTER TABLE `qc_reports` DISABLE KEYS */;
INSERT INTO `qc_reports` VALUES (2,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE.ifc','Athira','Sangavi','Induja','check the walls',92,'OK','3_Firefly quality tracker for project more images 16542.jpg','submitted','2024-08-08 04:30:54'),(3,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE MEP.ifc','Akash','Sangavi','Induja','check the road width',93,'OK','4_Firefly quality tracker for project more images 39597.jpg','submitted','2024-08-08 04:30:54'),(4,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE MEP.rvt','Sajmeen','Sangavi','Induja','check the road left',95,'OK','5_Firefly quality tracker for project more images 90106.jpg','submitted','2024-08-08 04:30:54'),(14,'VB-0081','GENESIS TOWER','ES-28-032183_RT_MADRID SAN FRANCISCO DE SALES 36 ATW_32183.rvt','Allson','Sangavi','Raj Sanghani','check the tower',92,'Approved','View File','submitted','2024-08-08 10:31:31'),(17,'VB-0081','GENESIS TOWER','ES-28-032183_RT_MADRID SAN FRANCISCO DE SALES 36 ATW_32184.rvt','Abhiyuktha','Sangavi','Raj Sanghani','check the wall',93,'Approved','View File','submitted','2024-08-08 10:43:58'),(19,'VB-0081','GENESIS TOWER','ES-03-055765_RT_COX ATW_55765.rvt','Roshith Kumar','Sangavi','Raj Sanghani','check the m1',91,'Approved','View File','submitted','2024-08-08 10:57:43'),(21,'VB-0059','CHANGI AIRPORT','TL_L3_EP221230J.RCP','Karthikeyan','Sangavi','Sureshkumar','check the door',92,'Approved','View File','submitted','2024-08-08 11:26:53'),(22,'VB-0059','CHANGI AIRPORT','TL_L3_MB221223L-2BCL.RCP','Roshith Kumar','Sangavi','Sureshkumar','check the wall',93,'Approved','View File','submitted','2024-08-08 11:26:53'),(24,'VB-0059','CHANGI AIRPORT','TL_L3_MB_230731L_NEW.RCP','Srinithiyan','Sangavi','Sureshkumar','check the door width',91,'Approved','View File','submitted','2024-08-08 11:26:53'),(25,'VB-0059','CHANGI AIRPORT','TL_L3_WP_221230J-1.RCP','Akash','Sangavi','Sureshkumar','check the door width',92,'Approved','View File','submitted','2024-08-08 11:41:14'),(26,'VB-0055','Bryder Project Floor Planner','Bryder Project Floor.rvt','Shaahid','Sangavi','Parivendhan','check the floor',92,'Approved','View File','submitted','2024-08-09 08:37:07'),(27,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors1.rvt','Mohammed Rayeez','Sangavi','Parivendhan','check the floor side',94,'Approved','View File','submitted','2024-08-09 08:37:07'),(28,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors2.rvt','Cedric','Sangavi','Parivendhan','check the Doorsnede A-A',97,'Approved','View File','submitted','2024-08-09 08:37:07');
/*!40000 ALTER TABLE `qc_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submitfilestoqc`
--

DROP TABLE IF EXISTS `submitfilestoqc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submitfilestoqc` (
  `submission_id` int NOT NULL AUTO_INCREMENT,
  `proj_id` varchar(255) NOT NULL,
  `project` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `checklist` varchar(255) DEFAULT NULL,
  `submitted_modeller` varchar(255) NOT NULL,
  `qc_person` varchar(255) NOT NULL,
  `assigned_by` varchar(255) NOT NULL,
  `additional_notes` text,
  `score` int DEFAULT NULL,
  `QC_REVIEW` text,
  `upload_photo` varchar(255) DEFAULT NULL,
  `submission_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) DEFAULT 'QC',
  PRIMARY KEY (`submission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submitfilestoqc`
--

LOCK TABLES `submitfilestoqc` WRITE;
/*!40000 ALTER TABLE `submitfilestoqc` DISABLE KEYS */;
INSERT INTO `submitfilestoqc` VALUES (3,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE.ifc','http://127.0.0.1:9500/checklist/20240807234854_PATEL_ROAD_PUMP_HOUSE_SUMMARY.docx','Athira','Sangavi','Induja','check the walls',92,'OK','3_quality.jpg','2024-08-07 18:28:32','QC'),(4,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE MEP.ifc','http://127.0.0.1:9500/checklist/20240807234854_PATEL_ROAD_PUMP_HOUSE_SUMMARY.docx','Akash','Sangavi','Induja','check the road width',93,'OK','4_Firefly quality tracker for project more images 39597.jpg','2024-08-07 18:29:23','QC'),(5,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE MEP.rvt','http://127.0.0.1:9500/checklist/20240807235459_20240806124831_Check_List.pdf','Sajmeen','Sangavi','Induja','check the road left',95,'OK','5_Firefly quality tracker for project more images 90106.jpg','2024-08-07 18:30:30','QC'),(6,'VB-0050','Patel Road Pump House','PATEL ROAD PUMP HOUSE.rvt','http://127.0.0.1:9500/checklist/20240807235629_KFAA_QAQC_ARC.pdf','Harshal','Sangavi','Induja','check the pump',89,'NOT','6_quality.jpg','2024-08-07 18:32:01','QC'),(20,'VB-0081','GENESIS TOWER','ES-28-032183_RT_MADRID SAN FRANCISCO DE SALES 36 ATW_32183.rvt','http://127.0.0.1:9500/checklist/20240808155911_20240806124831_Check_List.pdf','Allson','Sangavi','Raj Sanghani','check the tower',92,'Approved','20_qualityfinal.png','2024-08-08 10:30:29','QC'),(22,'VB-0081','GENESIS TOWER','ES-28-032183_RT_MADRID SAN FRANCISCO DE SALES 36 ATW_32184.rvt','http://127.0.0.1:9500/checklist/20240808160447_ESEC_QAQC.pdf','Abhiyuktha','Sangavi','Raj Sanghani','check the wall',93,'Approved','22_Media.jpg','2024-08-08 10:42:58','QC'),(24,'VB-0081','GENESIS TOWER','ES-03-055765_RT_COX ATW_55767.rvt','http://127.0.0.1:9500/checklist/20240808162058_20240806124831_Check_List.pdf','Ibrahim','Sangavi','Raj Sanghani','check the M1 LINEA DE VIDA wrong placement\n',70,'Not Approved','24_image.jpg','2024-08-08 10:52:09','QC'),(25,'VB-0081','GENESIS TOWER','ES-03-055765_RT_COX ATW_55765.rvt','http://127.0.0.1:9500/checklist/20240808162428_20240806124831_Check_List.pdf','Roshith Kumar','Sangavi','Raj Sanghani','check the m1',91,'Approved','25_MicrosoftTeams-image.png','2024-08-08 10:56:40','QC'),(26,'VB-0059','CHANGI AIRPORT','TL_L3_EP221230J.RCP','http://127.0.0.1:9500/checklist/20240808164842_ESEC_QAQC.pdf','Karthikeyan','Sangavi','Sureshkumar','check the door',92,'Approved','26_qualityfinal.png','2024-08-08 11:20:00','QC'),(27,'VB-0059','CHANGI AIRPORT','TL_L3_MB221223L-2BCL.RCP','http://127.0.0.1:9500/checklist/20240808164750_KFAA_QAQC_ARC.pdf','Roshith Kumar','Sangavi','Sureshkumar','check the wall',93,'Approved','27_Media.jpg','2024-08-08 11:21:08','QC'),(30,'VB-0059','CHANGI AIRPORT','TL_L3_MB_230731L_NEW.RCP','http://127.0.0.1:9500/checklist/20240808164529_20240806124831_Check_List.pdf','Srinithiyan','Sangavi','Sureshkumar','check the door width',91,'Approved','30_Media.jpg','2024-08-08 11:24:04','QC'),(31,'VB-0059','CHANGI AIRPORT','TL_L3_WP_221230J-1.RCP','http://127.0.0.1:9500/checklist/20240808170730_20240806124831_Check_List.pdf','Akash','Sangavi','Sureshkumar','check the door width',92,'Approved','31_image.jpg','2024-08-08 11:38:59','QC'),(32,'VB-0059','CHANGI AIRPORT','TL_L3_WP_20515L.RCP(MEP)','http://127.0.0.1:9500/checklist/20240808164644_KFAA_QAQC_ARC.pdf','Sunil Kumar','Sangavi','Sureshkumar','check the door width is not correct',78,'Not Approved','32_MicrosoftTeams-image.png','2024-08-08 11:39:40','QC'),(33,'VB-0055','Bryder Project Floor Planner','Bryder Project Floor.rvt','http://127.0.0.1:9500/checklist/20240809135805_A_E_facade_Facade__Section.pdf','Shaahid','Sangavi','Parivendhan','check the floor',92,'Approved','33_qualityfinal.png','2024-08-09 08:30:25','QC'),(34,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors1.rvt','http://127.0.0.1:9500/checklist/20240809135728_832_QC_COMMENTS_A_E.pdf','Mohammed Rayeez','Sangavi','Parivendhan','check the floor side',94,'Approved','34_qualityfinal.png','2024-08-09 08:31:11','QC'),(35,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors2.rvt','http://127.0.0.1:9500/checklist/20240809135644_A_E_facade_Facade__Section.pdf','Cedric','Sangavi','Parivendhan','check the Doorsnede A-A',97,'Approved','35_quality.jpg','2024-08-09 08:32:38','QC'),(36,'VB-0055','Bryder Project Floor Planner','Bryder Project Floors3.rvt','http://127.0.0.1:9500/checklist/20240809135556_22011_QC_COMMENTS_D_E.pdf','Shakil','Sangavi','Parivendhan','check the Door C',69,'Not Approved','36_Firefly quality tracker for project more images 39597.jpg','2024-08-09 08:34:19','QC');
/*!40000 ALTER TABLE `submitfilestoqc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `Emp_id` varchar(50) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_created` varchar(255) DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_expired` date NOT NULL DEFAULT '2999-12-31',
  `photo_filename` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (57,'E-060','Abinaya','R','abinaya@vulcansbuild.com','Admin','9384421840','2024-07-30 08:16:24','Amruta','2024-07-30 08:16:24','2999-12-31','E-060 Abinaya.jpg','Abinaya'),(58,'M-005','Suresh kumar','Gnanasekaran','suresh@vulcansbuild.com','Manager','9176125528','2024-07-30 08:22:33','Abinaya','2024-07-30 08:22:33','2999-12-31','abcde) M-005 Suresh Kumar Gnanasekaran.jpg','Suresh kumar'),(59,'E-010','Thiyagarajan','Govindaraj','thiyagarajan@vulcansbuild.com','Modeller','7358611901','2024-07-30 08:26:22','Abinaya','2024-07-30 08:26:22','2999-12-31','E-010 Thiyagarajan Govindaraj.JPG','Thiyagarajan'),(60,'E-097','Praveen','Elumalai','praveen@vulcansbuild.com','Manager','9500077787','2024-07-30 08:29:31','Abinaya','2024-07-30 08:29:31','2999-12-31','E-097 Praveen Elumalai (O+ve).jpg','Praveen'),(63,'E-103','Mohamed Arshad','S','Arshad@vulcansbuild.com','Teamleader','8220403664','2024-07-30 08:36:15','Abinaya','2024-07-30 08:36:15','2999-12-31','E-103 S Mohamed Arshad  B+ve.JPG','Mohamed Arshad'),(65,'E-015','Karthikeyan','Jothiswaran','karthikeyan@vulcansbuild.com','Modeller','9486715370','2024-07-30 09:32:07','Abinaya','2024-07-30 09:32:07','2999-12-31','E-015 Karthikeyan Jothiswaran.jpg','Karthikeyan'),(66,'E-017','Parivendhan','Lakshmanan','parivendhan@vulcansbuild.com','Teamleader','9597992393','2024-07-30 09:33:27','Abinaya','2024-07-30 09:33:27','2999-12-31','E-017 Parivendhan Lakshmanan.jpg','Parivendhan'),(69,'E-051','Abhiyuktha','P V','abhiyuktha@vulcansbuild.com','Modeller','9746650775','2024-07-30 09:55:21','Abinaya','2024-07-30 09:55:21','2999-12-31','E-051 Abhiyuktha.jpg','Abhiyuktha'),(70,'E-066','Prabhakaran','D','prabhakaran@vulcansbuild.com','Modeller','8667315134','2024-07-30 09:58:57','Abinaya','2024-07-30 09:58:57','2999-12-31','E-066 Prabhakaran.jpg','Prabhakaran'),(71,'E-068','Shakil','H','shakil@vulcansbuild.com','Modeller','8526750727','2024-07-30 10:00:03','Abinaya','2024-07-30 10:00:03','2999-12-31','E-068 Shakil H .jpg','Shakil'),(72,'E-069','Mohamed Riyas','A','riyas@vulcansbuild.com','Modeller','9994319597','2024-07-30 10:01:16','Abinaya','2024-07-30 10:01:16','2999-12-31','E-069 Mohamed Riyas.jpg','Mohamed Riyas'),(73,'E-070','Tushar','Bairwa','tushar@vulcansbuild.com','Teamleader','6358135550','2024-07-30 10:05:40','Abinaya','2024-07-30 10:05:40','2999-12-31','E-070 Tushar Bairwa .jpg','Tushar'),(74,'E-052','Sureshkumar','Selvam','sureshkumar@vulcansbuild.com','Teamleader','7904130390','2024-07-30 10:07:11','Abinaya','2024-07-30 10:07:11','2999-12-31','E-052 Suresh Kumar.jpg','Sureshkumar'),(75,'E-014','Ramya','Muthuraman','ramya@vulcansbuild.com','Teamleader','9159152126','2024-07-30 10:09:09','Abinaya','2024-07-30 10:09:09','2999-12-31','E-014 Ramya Muthuraman.jpeg','Ramya'),(76,'E-091','Induja','Palanikumar','Induja@vulcansbuild.com','Teamleader','8939149981','2024-07-30 10:10:30','Abinaya','2024-07-30 10:10:30','2999-12-31','E-091 Induja Palanikumar (B+ve).jpg','Induja'),(77,'E-086','Ibrahim','Mohammad','Ibrahim@vulcansbuild.com','Modeller','6359596851','2024-07-30 10:14:39','Abinaya','2024-07-30 10:14:39','2999-12-31','E-086 Ibrahim Shaik (O+).jpg','Mohammadibrahim '),(78,'E-090','Jaidev','s','Jaidev@vulcansbuild.com','Modeller','6375713330','2024-07-30 10:16:32','Abinaya','2024-07-30 10:16:32','2999-12-31','E-090 Jaidev (AB-ve).jpg','Jaidev'),(79,'E-093','Akshay','Gokuldas Mane','Akshay@vulcansbuild.com','Modeller','8766879025','2024-07-30 10:18:13','Abinaya','2024-07-30 10:18:13','2999-12-31','E-093 Akshay Gokuldas Mane  O+ve.jpg','Akshay'),(81,'E-089','Priyanka','Kumari','Priyanka@vulcansbuild.com','Modeller','7740957605','2024-07-30 10:22:26','Abinaya','2024-07-30 10:22:26','2999-12-31','E-089 Priyanka Kumari (A+ve).jpg',NULL),(82,'E-099','Raj Sanghani','Arunbhai','raj@vulcansbuild.com','Teamleader','6353158668','2024-07-30 10:23:45','Abinaya','2024-07-30 10:23:45','2999-12-31','E-099 Sanghani Raj Arunbhai (B+ve).jpg',NULL),(85,'E-073','Sunil Kumar','M','sunilkumar@vulcansbuild.com','Modeller','8940127949','2024-07-30 10:27:57','Abinaya','2024-07-30 10:27:57','2999-12-31','E-073 SUNIL KUMAR M .jpg',NULL),(86,'E-101','Srinithiyan','Balaji','srinithyan@vulcansbuild.com','Modeller','7358337196','2024-07-30 10:29:48','Abinaya','2024-07-30 10:29:48','2999-12-31','E-101 Srinithiyan A+ve.jpg',NULL),(87,'E-037','Hari','Baskar','haribhaskar@vulcansbuild.com','Modeller','9629681801','2024-07-30 10:31:44','Abinaya','2024-07-30 10:31:44','2999-12-31','E-037 Haribaskar G P A.jpg',NULL),(88,'E-043','Dinesh Kumar','A','dineshkumar@vulcansbuild.com','Modeller','6369488920','2024-07-30 10:34:04','Abinaya','2024-07-30 10:34:04','2999-12-31','E-043 Dinesh Kumar Athikesavan.jpg',NULL),(89,'E-072','Sajmeen','Mohamed','sajmeen@vulcansbuild.com','Modeller','8489086090','2024-07-30 10:35:47','Abinaya','2024-07-30 10:35:47','2999-12-31','E-072 S.Mohamed Sajmeen  .jpg',NULL),(90,'E-033','Athira','T R','athira@vulcansbuild.com','Modeller','9048241271','2024-07-30 10:37:28','Abinaya','2024-07-30 10:37:28','2999-12-31','E-033 Athira T R.jpeg',NULL),(91,'E-004','Selvakumar','D','selvakumar@vulcansbuild.com','Modeller','9994965846','2024-07-30 10:39:53','Abinaya','2024-07-30 10:39:53','2999-12-31','E-004 Selvakumar Durai.jpeg',NULL),(92,'E-045','Ashwin','M','ashwin@vulcansbuild.com','Modeller','9447704509','2024-07-30 10:40:52','Abinaya','2024-07-30 10:40:52','2999-12-31','E-045 Ashwin.jpg',NULL),(93,'E-087','Manoj','Palanisamy','manoj@vulcansbuild.com','Modeller','8778819581','2024-07-30 10:42:22','Abinaya','2024-07-30 10:42:22','2999-12-31','E-087 Manoj Palanisamy (B+).jpg',NULL),(94,'E-035','Thavasimani','V','thavasimani@vulcansbuild.com','Modeller','9025761130','2024-07-30 10:46:50','Abinaya','2024-07-30 10:46:50','2999-12-31','E-035 Thavasimani V.jpeg',NULL),(95,'E-100','Nijil','A  P','Nijil@vulcansbuild.com','Modeller','8075402095','2024-07-30 10:48:04','Abinaya','2024-07-30 10:48:04','2999-12-31','E-100 Nijil AP AB+ve.jpg',NULL),(96,'E-080','Harshal','Virkhare','Harshal.virkhare@vulcansbuild.com','Modeller','8300295645','2024-07-30 10:57:35','Abinaya','2024-07-30 10:57:35','2999-12-31','E-080 Harshal Virkhare(B+ve).jpg',NULL),(97,'E-092','zakir','Shaikh','zakir@vulcansbuild.com','Modeller','8460621570','2024-07-30 11:00:04','Abinaya','2024-07-30 11:00:04','2999-12-31','E-092 Shaikh Zakir Husen Mojahir (B-ve).jpg',NULL),(98,'E-102','Allson','V','Allson@vulcansbuild.com','Modeller','9626578736','2024-07-30 11:57:26','Abinaya','2024-07-30 11:57:26','2999-12-31','E-102 Allson. V    O+ve.jpg',NULL),(100,'E-076','Sangavi','I','sangavi@vulcansbuild.com','QC','9551565455','2024-07-31 05:19:21','Abinaya','2024-07-31 05:19:21','2999-12-31','E-076 Sangavi I (A1-ve).png',NULL),(101,'E-013','Jayaprakash','J','jayaprakash@vulcansbuild.com','Manager','8438385349','2024-07-31 13:00:08','Abinaya','2024-07-31 13:00:08','2999-12-31','E-013 Jayaprakash Jayaram.jpg',NULL),(102,'E-012','deeban','P','deeban@vulcansbuild.com','Modeller','9486554782','2024-07-31 13:01:23','Abinaya','2024-07-31 13:01:23','2999-12-31','E-012 Deeban Prabagar.jpg',NULL),(103,'E-057','Akash','C','akash@vulcansbuild.com','Modeller','8668164413','2024-07-31 13:02:39','Abinaya','2024-07-31 13:02:39','2999-12-31','E-057 Akash.jpg',NULL),(104,'E-094','Roshith Kumar','D','Roshith@vulcansbuild.com','Modeller','9698751909','2024-07-31 13:05:37','Abinaya','2024-07-31 13:05:37','2999-12-31','E-094 D Roshith Kumar (B+ve).jpg',NULL),(105,'E-055','Shaahid','Mohamood','shaahid@vulcansbuild.com','Modeller','9578250481','2024-08-09 08:05:25','Abinaya','2024-08-09 08:05:25','2999-12-31','E-055 Shaahid Mohamood.jpg',NULL),(106,'E-056','Mohammed Rayeez','S','rayez@vulcansbuild.com','Modeller','9360791985','2024-08-09 08:15:53','Abinaya','2024-08-09 08:15:53','2999-12-31','E-056 Mohammed Rayeez.jpg',NULL),(107,'E-059','Cedric','W V','cedric@vulcansbuild.com','Modeller','8300295645','2024-08-09 08:21:47','Abinaya','2024-08-09 08:21:47','2999-12-31','E-059 Cedric.jpg',NULL),(108,'E-062','Sujitha','s','sujitha@vulcansbuild.com','Modeller','9787350117','2024-08-12 09:53:39','Abinaya','2024-08-12 09:53:39','2999-12-31','E-062 Sujitha .jpg',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dec19'
--

--
-- Final view structure for view `modeller_performance_view`
--

/*!50001 DROP VIEW IF EXISTS `modeller_performance_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `modeller_performance_view` AS select `u`.`first_name` AS `ModellerFirstName`,`p`.`ProjectID` AS `ProjectID`,`p`.`ProjectName` AS `ProjectName`,`p`.`Filename` AS `Filename`,`p`.`Status` AS `Status`,`p`.`DateAssigned` AS `DateAssigned`,`p`.`SubmissionDate` AS `SubmissionDate`,`p`.`CompletionDate` AS `CompletionDate`,`p`.`Score` AS `Score` from (`users` `u` join `project_status_view` `p` on((`u`.`first_name` = `p`.`Modeller`))) where (`u`.`role` = 'Modeller') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `project_dashboard`
--

/*!50001 DROP VIEW IF EXISTS `project_dashboard`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `project_dashboard` AS select `a`.`project_id` AS `ProjectID`,`a`.`project_name` AS `ProjectName`,`a`.`team_leader` AS `TeamLeader`,`a`.`status` AS `ProjectStatus`,`a`.`filename` AS `Filename`,`a`.`date_submission` AS `DateSubmission`,`a`.`assigned_by` AS `AssignedBy`,`b`.`modeller` AS `Modeller`,`b`.`status` AS `ModellerStatus`,`b`.`date_of_assignment` AS `DateOfAssignment`,`s`.`submission_id` AS `SubmissionID`,`s`.`file` AS `SubmissionFile`,`s`.`submitted_modeller` AS `SubmittedModeller`,`s`.`qc_person` AS `QCPerson`,`s`.`additional_notes` AS `AdditionalNotes`,`s`.`score` AS `Score`,`s`.`QC_REVIEW` AS `QCReview`,`s`.`upload_photo` AS `UploadPhoto`,`s`.`submission_date` AS `SubmissionDate`,`s`.`status` AS `SubmissionStatus`,`q`.`id` AS `ReportID`,`q`.`file` AS `ReportFile`,`q`.`submitted_modeller` AS `ReportModeller`,`q`.`qc_person` AS `ReportQCPerson`,`q`.`score` AS `ReportScore`,`q`.`qc_review` AS `ReportQCReview`,`q`.`upload_photo` AS `ReportUploadPhoto`,`q`.`status` AS `ReportStatus`,`q`.`date_of_completion` AS `ReportDateOfCompletion` from (((`assignprojectstotl` `a` left join `assignprojectstomodellers` `b` on((`a`.`project_id` = `b`.`project_id`))) left join `submitfilestoqc` `s` on((`a`.`project_id` = `s`.`proj_id`))) left join `qc_reports` `q` on((`a`.`project_id` = `q`.`proj_id`))) order by `a`.`project_name`,`b`.`modeller`,`s`.`submission_date`,`q`.`date_of_completion` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `project_status_view`
--

/*!50001 DROP VIEW IF EXISTS `project_status_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `project_status_view` AS with `latestassignments` as (select `apm`.`project_id` AS `ProjectID`,`apm`.`project_name` AS `ProjectName`,`apm`.`modeller` AS `Modeller`,`apm`.`file_name` AS `Filename`,`apm`.`status` AS `AssignmentStatus`,`apm`.`date_of_assignment` AS `DateAssigned` from `assignprojectstomodellers` `apm` where (`apm`.`date_of_assignment` = (select max(`apm2`.`date_of_assignment`) from `assignprojectstomodellers` `apm2` where ((`apm2`.`project_id` = `apm`.`project_id`) and (`apm2`.`file_name` = `apm`.`file_name`))))), `latestsubmissions` as (select `sqc`.`proj_id` AS `ProjectID`,`sqc`.`file` AS `Filename`,`sqc`.`status` AS `SubmissionStatus`,`sqc`.`submission_date` AS `SubmissionDate` from `submitfilestoqc` `sqc` where (`sqc`.`submission_date` = (select max(`sqc2`.`submission_date`) from `submitfilestoqc` `sqc2` where ((`sqc2`.`proj_id` = `sqc`.`proj_id`) and (`sqc2`.`file` = `sqc`.`file`))))), `latestreports` as (select `qr`.`proj_id` AS `ProjectID`,`qr`.`file` AS `Filename`,`qr`.`status` AS `ReportStatus`,`qr`.`score` AS `Score`,`qr`.`qc_review` AS `QCReview`,`qr`.`qc_person` AS `QCPerson`,`qr`.`date_of_completion` AS `CompletionDate` from `qc_reports` `qr` where (`qr`.`date_of_completion` = (select max(`qr2`.`date_of_completion`) from `qc_reports` `qr2` where ((`qr2`.`proj_id` = `qr`.`proj_id`) and (`qr2`.`file` = `qr`.`file`))))) select `la`.`ProjectID` AS `ProjectID`,`la`.`ProjectName` AS `ProjectName`,`la`.`Modeller` AS `Modeller`,`la`.`Filename` AS `Filename`,coalesce(`la`.`AssignmentStatus`,'Not Assigned') AS `Status`,`la`.`DateAssigned` AS `DateAssigned`,`ls`.`SubmissionDate` AS `SubmissionDate`,`lr`.`CompletionDate` AS `CompletionDate`,`lr`.`Score` AS `Score`,`lr`.`QCReview` AS `QCReview`,`lr`.`QCPerson` AS `QCPerson` from ((`latestassignments` `la` left join `latestsubmissions` `ls` on(((`la`.`ProjectID` = `ls`.`ProjectID`) and (`la`.`Filename` = `ls`.`Filename`)))) left join `latestreports` `lr` on(((`la`.`ProjectID` = `lr`.`ProjectID`) and (`la`.`Filename` = `lr`.`Filename`)))) union select `ls`.`ProjectID` AS `ProjectID`,(select `assignprojectstomodellers`.`project_name` from `assignprojectstomodellers` where (`assignprojectstomodellers`.`project_id` = `ls`.`ProjectID`) limit 1) AS `ProjectName`,'' AS `Modeller`,`ls`.`Filename` AS `Filename`,coalesce(`ls`.`SubmissionStatus`,'Not Submitted') AS `Status`,NULL AS `DateAssigned`,`ls`.`SubmissionDate` AS `SubmissionDate`,`lr`.`CompletionDate` AS `CompletionDate`,`lr`.`Score` AS `Score`,`lr`.`QCReview` AS `QCReview`,`lr`.`QCPerson` AS `QCPerson` from (`latestsubmissions` `ls` left join `latestreports` `lr` on(((`ls`.`ProjectID` = `lr`.`ProjectID`) and (`ls`.`Filename` = `lr`.`Filename`)))) where `ls`.`ProjectID` in (select `latestassignments`.`ProjectID` from `latestassignments` where (`latestassignments`.`Filename` = `ls`.`Filename`)) is false union select `lr`.`ProjectID` AS `ProjectID`,(select `assignprojectstomodellers`.`project_name` from `assignprojectstomodellers` where (`assignprojectstomodellers`.`project_id` = `lr`.`ProjectID`) limit 1) AS `ProjectName`,'' AS `Modeller`,`lr`.`Filename` AS `Filename`,`lr`.`ReportStatus` AS `Status`,NULL AS `DateAssigned`,NULL AS `SubmissionDate`,`lr`.`CompletionDate` AS `CompletionDate`,`lr`.`Score` AS `Score`,`lr`.`QCReview` AS `QCReview`,`lr`.`QCPerson` AS `QCPerson` from `latestreports` `lr` where (`lr`.`ProjectID` in (select `latestassignments`.`ProjectID` from `latestassignments` where (`latestassignments`.`Filename` = `lr`.`Filename`)) is false and `lr`.`ProjectID` in (select `latestsubmissions`.`ProjectID` from `latestsubmissions` where (`latestsubmissions`.`Filename` = `lr`.`Filename`)) is false) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-13 14:57:19
