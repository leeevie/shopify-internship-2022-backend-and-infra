DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    stock INTEGER NOT NULL
);

-- seed data

INSERT INTO inventory (item, stock)
VALUES ('Blue Raspberry', 6),
('Green Apple', 2),
('Crazy Popcorn', 4),
('Distinguished Lime', 1);