create table playlist(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(128),
  genre VARCHAR(128)
);

create table track(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  playlist_id INTEGER NOT NULL,
  title VARCHAR(128),
  artist VARCHAR(128),
  album_picture VARCHAR(256),
  youtube_url VARCHAR(128)
);

create table `user` (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  email VARCHAR(128),
  password VARCHAR(128)
);

create table user_playlist(
  user_id INTEGER NOT NULL,
  playlist_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, playlist_id)
);

ALTER TABLE track ADD CONSTRAINT fk_playlist_id FOREIGN KEY (playlist_id) REFERENCES playlist(id);

ALTER TABLE user_playlist ADD CONSTRAINT fk_user_playlist_user_id FOREIGN KEY (user_id) REFERENCES user(id);
ALTER TABLE user_playlist ADD CONSTRAINT fk_user_playlist_playlist_id FOREIGN KEY (playlist_id) REFERENCES playlist(id);
