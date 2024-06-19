import Database from 'better-sqlite3';

let db;
try {
    db = new Database('database.sqlite');
    console.log('Connected to the SQLite database.');
} catch (e) {
    console.error('Error while initializing db!', e);
    throw e;
}

const createTables = () => {
    try {
        db.exec(`CREATE TABLE IF NOT EXISTS recipes (
            recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type_of_meat TEXT NOT NULL, 
            course TEXT NOT NULL,
            description TEXT NOT NULL,
            prepTime TIME NOT NULL,
            image_url TEXT NOT NULL
        )`);

        db.exec(`CREATE TABLE IF NOT EXISTS ingredients (
            ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipe_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            unit TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
        )`);

        db.exec(`CREATE TABLE IF NOT EXISTS reviews (
            review_id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipe_id INTEGER,
            rating INTEGER NOT NULL,
            comment TEXT NOT NULL,
            date DATE NOT NULL,
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
        )`);
        console.log('Tables created or already exist.');
    } catch (e) {
        console.error('Error while creating tables!', e);
        throw e;
    }
};

createTables();

export default db;
