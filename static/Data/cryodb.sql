-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cryodb
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
CREATE TABLE `tours` (
  `name` varchar(15) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `tours` WRITE;
INSERT INTO `tours` VALUES ('Alaska'),('Greenland'),('Iceland'),('GrandCanyon');
UNLOCK TABLES;

--
-- Table structure for table `waypoints`
--

DROP TABLE IF EXISTS `waypoints`;
CREATE TABLE `waypoints` (
  `name` varchar(15) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `tour` varchar(15) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `latitude` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `longitude` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `num` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`,`tour`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `waypoints` WRITE;
INSERT INTO `waypoints` VALUES ('Juneau','Alaska','58.271403','-134.443284','This place cold.',0),('Fairbanks','Alaska','64.833965','-147.657242','This place is fair.',1),('Anchorage','Alaska','61.195141','-149.809919','This place also cold.',2);
INSERT INTO `waypoints` VALUES ('Kangerlussuaq','Greenland','67.00','-50.41','Much snow',0),('Sarqaq','Greenland','70','-51','The population of Sarqar is 188 o.o',1);
INSERT INTO `waypoints` VALUES ('Reykjavik','Iceland','64','-21','Icelands coastal capital',0),('Akureyri','Iceland','65.41','-18.06','Cold...',1);
INSERT INTO `waypoints` VALUES ('canyon1','GrandCanyon','36.093','-112.065','Grand Canyon point 1',0),('canyon2','GrandCanyon','36.087535','-112.053251','Grand Canyon point 2',1), ('canyon3','GrandCanyon','36.051736 ','-111.98729','Grand Canyon point 2',1) ;
UNLOCK TABLES;