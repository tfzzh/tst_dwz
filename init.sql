CREATE DATABASE `tst_dwz` DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE `d_link` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `d_url` varchar(8) NOT NULL COMMENT '短网址',
  `tar_url` varchar(4096) DEFAULT NULL COMMENT '原网址',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `call_times` varchar(45) DEFAULT NULL COMMENT '被调用次数',
  `last_call_time` bigint(20) DEFAULT NULL COMMENT '最后一次被访问时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `d_url_UNIQUE` (`d_url`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `d_link_log` (
  `id` int(11) NOT NULL COMMENT '自增ID',
  `d_url` varchar(8) DEFAULT NULL COMMENT '目标短地址',
  `call_time` bigint(20) DEFAULT NULL COMMENT '访问时间',
  `ip` varchar(55) DEFAULT NULL COMMENT '访问ip',
  PRIMARY KEY (`id`),
  KEY `d_url_ind` (`d_url`),
  KEY `ctime_ind` (`call_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='短连接访问日志';
