DROP TABLE IF EXISTS `answers`;
DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT (uuid()),
  `body` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `calls` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `questions_UN` (`body`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `answers` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `body` varchar(511) NOT NULL,
  `question` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `answers_UN` (`body`),
  KEY `answers_FK` (`question`),
  CONSTRAINT `answers_FK` FOREIGN KEY (`question`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;