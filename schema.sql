-- Price history: one row per trip (entry zone to exit zone) per feed interval.
CREATE TABLE IF NOT EXISTS tolls (
  road TEXT NOT NULL,            -- 'i66i' = I-66 inside the Beltway
  dir TEXT NOT NULL,             -- 'EB' / 'WB'
  from_zone TEXT NOT NULL,
  to_zone TEXT NOT NULL,
  interval_start TEXT NOT NULL,  -- UTC, from the feed
  toll REAL NOT NULL,
  PRIMARY KEY (road, dir, from_zone, to_zone, interval_start)
);
