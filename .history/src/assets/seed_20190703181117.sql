DROP TABLE user;
CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT);

INSERT or IGNORE INTO user VALUES (1, 'Simon Perez','Simon@gmail.com','000');
INSERT or IGNORE INTO user VALUES (2, 'Max Power','Max@gmail.com','000');
INSERT or IGNORE INTO user VALUES (3, 'Ben Hito', 'Ben@gmail.com','000');
 