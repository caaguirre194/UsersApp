CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,lastname TEXT, type_skin TEXT,birth_date TEXT, img TEXT);

INSERT or IGNORE INTO user VALUES (1, 'Simon', 'Perez','Piel caucásica', 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT or IGNORE INTO user VALUES (2, 'Max', 'Power','Piel Asiática', 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg');
INSERT or IGNORE INTO user VALUES (3, 'Ben', 'Hito','Piel Oscura', 'https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');
 