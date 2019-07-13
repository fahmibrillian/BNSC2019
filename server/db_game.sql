/*
Navicat MySQL Data Transfer

Source Server         : Localhost
Source Server Version : 100131
Source Host           : localhost:3306
Source Database       : db_game

Target Server Type    : MYSQL
Target Server Version : 100131
File Encoding         : 65001

Date: 2019-07-13 23:48:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for game
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `id_game` int(11) NOT NULL AUTO_INCREMENT,
  `nama_game` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_game`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of game
-- ----------------------------
INSERT INTO `game` VALUES ('1', 'Tetris', null, null);
INSERT INTO `game` VALUES ('2', 'Dragon Run', null, null);

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `id_score` int(11) NOT NULL AUTO_INCREMENT,
  `id_game` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_score`),
  KEY `user_id` (`id_user`),
  KEY `game_id` (`id_game`),
  CONSTRAINT `fk_score_game` FOREIGN KEY (`id_game`) REFERENCES `game` (`id_game`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_score_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('1', '1', '1', '9000', '2019-07-13 16:39:49', '2019-07-13 16:39:49');
INSERT INTO `score` VALUES ('2', '2', '1', '9000', '2019-07-13 16:41:09', '2019-07-13 16:41:09');
INSERT INTO `score` VALUES ('3', '1', '1', '7000', '2019-07-13 16:41:26', '2019-07-13 16:41:26');
INSERT INTO `score` VALUES ('4', '1', '1', '1000', '2019-07-13 16:41:41', '2019-07-13 16:41:41');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `url_foto` varchar(100) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Brillian Fahmi', 'UjangGG', 'fahmibrillian1@gmail.com', '$2y$10$8/0pBDulxW/o99uBd/TkcO3ptmqkC5OHEWvhCGG5AURobUnE7JA0.', '2019-09-09', '089502783000', null, '$2y$10$fEHcqyZN2W2eVZT6qfJ1meBsV6fBnJsr4wUXGyFnhm5vofemcNWOu', null, '2019-07-13 16:05:32', '2019-07-13 16:05:32');
