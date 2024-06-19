import db from '../database.js';

class Ingredient {
    static getAll(callback) {
        const sql = "SELECT * FROM ingredients";
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    }

    static getById(id, callback) {
        const sql = "SELECT * FROM ingredients WHERE ingredient_id = ?";
        const params = [id];
        db.get(sql, params, (err, row) => {
            callback(err, row);
        });
    }

    static getByRecipeId(recipe_id, callback) {
        const sql = "SELECT * FROM ingredients WHERE recipe_id = ?";
        const params = [recipe_id];
        db.all(sql, params, (err, rows) => {
            callback(err, rows);
        });
    }

    static create(data, callback) {
        const sql = 'INSERT INTO ingredients (recipe_id, name, unit, quantity) VALUES (?,?,?,?)';
        const params = [data.recipe_id, data.name, data.unit, data.quantity];
        db.run(sql, params, function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    static update(id, data, callback) {
        const sql = `UPDATE ingredients SET 
                     name = COALESCE(?,name), 
                     unit = COALESCE(?,unit), 
                     quantity = COALESCE(?,quantity) 
                     WHERE ingredient_id = ?`;
        const params = [data.name, data.unit, data.quantity, id];
        db.run(sql, params, function (err) {
            callback(err, this ? this.changes : null);
        });
    }

    static delete(id, callback) {
        const sql = "DELETE FROM ingredients WHERE ingredient_id = ?";
        const params = [id];
        db.run(sql, params, function (err) {
            callback(err, this ? this.changes : null);
        });
    }
}

export default Ingredient;
