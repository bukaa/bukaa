/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : bukaa

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2016-11-08 09:58:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(32) NOT NULL,
  `login_id` varchar(50) DEFAULT NULL,
  `login_pass` varchar(50) DEFAULT NULL,
  `real_name` varchar(100) DEFAULT NULL,
  `no` varchar(50) DEFAULT NULL,
  `org_id` varchar(32) DEFAULT NULL,
  `org_name` varchar(500) DEFAULT NULL,
  `sex` varchar(1) DEFAULT NULL,
  `id_card` varchar(18) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `last_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `last_ip` varchar(50) DEFAULT NULL,
  `login_num` int(50) DEFAULT NULL,
  `is_disabled` bit(1) DEFAULT b'0',
  `is_del` bit(1) DEFAULT b'0',
  `add_user` varchar(32) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'bukaa', '202cb962ac59075b964b07152d234b70', 'weidong', null, null, null, null, null, null, null, null, '2016-11-06 18:03:28', null, null, '', '', null, '2016-11-06 18:03:28');
