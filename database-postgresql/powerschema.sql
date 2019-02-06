DROP SCHEMA public CASCADE;

CREATE SCHEMA public;

CREATE TABLE trailPhotos (
  photo_id SERIAL PRIMARY KEY,
  trail_id integer,
  user_id integer,
  upload_date timestamptz,
  photo_url text,
  caption text,
  is_hero_photo boolean
);

\COPY trailPhotos(trail_id, user_id, upload_date, photo_url, caption, is_hero_photo) FROM '/Users/bijanalbrecht/Desktop/Hack_Reactor/photo-service/database-postgresql/trailphotos.csv' DELIMITER ',' CSV HEADER;

