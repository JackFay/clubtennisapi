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
