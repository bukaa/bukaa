/*
MySQL Backup
Source Server Version: 5.6.24
Source Database: bukaa
Date: 2016/12/8 15:35:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(32) CHARACTER SET latin1 NOT NULL,
  `login_id` varchar(32) CHARACTER SET latin1 DEFAULT NULL,
  `login_pass` varchar(32) CHARACTER SET latin1 DEFAULT NULL,
  `real_name` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `no` varchar(32) CHARACTER SET latin1 DEFAULT NULL,
  `org_id` varchar(32) CHARACTER SET latin1 DEFAULT NULL,
  `org_name` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `sex` char(1) CHARACTER SET latin1 DEFAULT NULL,
  `id_card` varchar(18) CHARACTER SET latin1 DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `mobile` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `email` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `last_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_ip` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `login_num` tinyint(10) DEFAULT NULL,
  `is_disabled` char(1) CHARACTER SET latin1 DEFAULT '0',
  `is_del` char(1) CHARACTER SET latin1 DEFAULT '0',
  `add_user` varchar(32) CHARACTER SET latin1 DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`id`),
  UNIQUE KEY `user_sfzh` (`id_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `sys_user` VALUES ('00000000000000000000000000000001','bukaa','202cb962ac59075b964b07152d234b70','bukaa','01',NULL,NULL,'1',NULL,NULL,NULL,NULL,'2016-12-07 14:11:13',NULL,NULL,'0','0',NULL,'2016-12-07 14:11:13');
