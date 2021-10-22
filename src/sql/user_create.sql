CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(40) NOT NULL,
	password VARCHAR(40) NOT NULL,
    first_name VARCHAR(40) NOT NULL,
	last_name VARCHAR(40) NOT NULL,
	email VARCHAR(40) NOT NULL,
    phone VARCHAR(40),
    role VARCHAR(40),
    PRIMARY KEY ( id )
);
