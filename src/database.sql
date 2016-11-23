DROP TABLE IF EXISTS events CASCADE;
create table events (
    id integer auto_increment,
    `date` datetime not null,
    title varchar(250) not null,
    `desc` varchar(250) null,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    user_id INTEGER AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(40) NOT NULL,
  username VARCHAR(20) NOT NULL UNIQUE,
  hash VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_id)
);

create table players (
    id integer auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    year varchar(10) not null,
    hometown varchar(30) null,
    high_school varchar(60) null,
    PRIMARY KEY (id)
)

INSERT INTO users VALUES (1, 'Jack', 'Fay', 'jack', 'test');
