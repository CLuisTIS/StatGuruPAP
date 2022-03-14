-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dbpap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dbpap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbpap` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `dbpap` ;

-- -----------------------------------------------------
-- Table `dbpap`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbpap`.`articles` (
  `idarticle` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `text` VARCHAR(7500) NOT NULL,
  `imagem` VARCHAR(7500) NOT NULL,
  PRIMARY KEY (`idarticle`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dbpap`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbpap`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  `public_key` VARCHAR(500) NULL DEFAULT NULL,
  `private_key` VARCHAR(500) NULL DEFAULT NULL,
  `level` ENUM('admin', 'regular') NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `username_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 52
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO `user` VALUES (1,'carlosluistis@outlook.pt','$2a$04$7wHUYMjV8giecEZ87LhF0OHWB0Cw5kQ2Vygjtgiezcs0efZ8MhJ6.','jbb83dpvm27','ssq8axgi4gc7','admin'),
(2,'carlao@outlook.pt','$2a$10$OO0EOR0nOv09z8SOikEdiuq2CLzjZC2MsZtw5htgFcFkU5qJYPtEa','rnlkesbzwhr14','jbapr2drlc14','regular'),


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
