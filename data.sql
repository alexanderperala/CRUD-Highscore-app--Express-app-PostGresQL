CREATE DATABASE highscore;

USE highscore;

CREATE TABLE `games` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`name` varchar(50) NOT NULL UNIQUE,
	`genre` varchar(50) NOT NULL,
	`description` varchar(500) NOT NULL,
	`image_url` varchar(500) NOT NULL,
	`url_slug` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `players` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`firstName` varchar(50) NOT NULL,
	`lastName` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `scores` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`player_id` INT NOT NULL,
	`date` DATE NOT NULL,
	`game_id` INT NOT NULL,
	`score` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `scores` ADD CONSTRAINT `scores_fk0` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`);

ALTER TABLE `scores` ADD CONSTRAINT `scores_fk1` FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON DELETE CASCADE;




INSERT INTO games (name, genre, description, image_url, url_slug)
VALUES
('Tetris','Puzzl', 'Lorem imsum dolor sit amet...', 'https://via.placeholder.com/380x380.png?text=Tetris', 'Tetris' ),
('Pac-Man', 'Labyrinth', 'Lorem imsum dolor sit amet...', 'https://via.placeholder.com/380x380.png?text=Pac-Man','Pac-Man' ),
('Asteroids', 'Shoot em up', 'Lorem imsum dolor sit amet...', 'https://via.placeholder.com/380x380.png?text=Asteroids', 'Asteroids'),
('Donkey Kong', 'Adventure', 'Lorem imsum dolor sit amet...', 'https://via.placeholder.com/380x380.png?text=Donkey+Kong', 'Donkey-Kong' ),
('Call of Duty', 'FPS', 'Lorem imsum dolor sit amet...', 'https://via.placeholder.com/380x380.png?text=Call+Of+Duty', 'Call-of-Duty');



INSERT INTO players (firstName, lastName, email)
VALUES
('Alexander', 'Jansson', 'alexanderJan@hotmail.com'),
('Max', 'Svensson', 'pepsiMax@gmail.com'),
('Johan', 'Andersson', 'joand1990@live.se'),
('Matilda', 'Pärson', 'milla12@hotmail.com'),
('Jossan', 'Kristiansen', 'trer1123@hotmail.com'),
('Pelle', 'Pålsson', '22ffg@gmail.com'),
('Sara', 'Gunnarssan', '5grsfsd@live.se'),
('Ahmed', 'Jakobsson', '54ff@hotmail.com'),
('Frida', 'Bengtsson', 'gdfgdg4.tt@telia.com');


INSERT INTO scores (player_id, date, game_id, score)
VALUES
(6, '2020-06-23', 1, 2564532),
(1, '2020-06-03', 1, 1873234),
(3, '2021-02-25', 4, 897873),
(2, '2021-04-12', 2,3948454),
(5, '2020-12-17', 3, 967345),
(4, '2020-12-17', 3, 967345),
(1, '2020-12-17', 2, 967345),
(6, '2021-04-12', 3,3948454),
(8, '2020-12-17', 2, 967345),
(7, '2020-12-17', 1, 967345),
(9, '2020-12-17', 3, 967345);







