DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    item VARCHAR(255) NOT NULL
);