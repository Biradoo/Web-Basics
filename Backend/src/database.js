import sqlite3 from 'sqlite3';

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        db.run(`CREATE TABLE IF NOT EXISTS recipes (
            recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name String,
            type_of_meat String,
            course String,
            description String,
            prepTime TIME,
            image_url TEXT
        )`, (err) => {
            if (err) {
                console.log('Table already exists.');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS ingredients (
            ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipe_id INTEGER,
            name String,
            unit String,
            quantity INTEGER,
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS reviews (
            review_id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipe_id INTEGER,
            rating INTEGER,
            comment String,
            date DATE,
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
        )`);
    }
});

export default db;
