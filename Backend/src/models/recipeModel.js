import db from '../database.js';

class Recipe {
    static getAll(callback) {
        const sql = "SELECT * FROM recipes";
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    }

    static getById(id, callback) {
        const sql = "SELECT * FROM recipes WHERE recipe_id = ?";
        const params = [id];
        db.get(sql, params, (err, row) => {
            callback(err, row);
        });
    }

    static getReviewsById(id, callback) {
        const sql = "SELECT * FROM reviews WHERE recipe_id = ?";
        const params = [id];
        db.all(sql, [params], (err , rows) => {
            callback(err, rows);
        });
    }

    static getQuickAndEasy(callback) {
        const sql = "SELECT * FROM recipes WHERE prepTime < 30";
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    }

    static getByTypeOfMeat(type_of_meat, callback) {
        const sql = "SELECT * FROM recipes WHERE type_of_meat = ?";
        const params = [type_of_meat];
        db.all(sql, params, (err, rows) => {
            callback(err, rows);
        });
    }

    static getByCourse(course, callback) {
        const sql = "SELECT * FROM recipes WHERE course = ?";
        const params = [course];
        db.all(sql, params, (err, rows) => {
            callback(err, rows);
        });
    }

    static getByCategory(category, callback) {
        if (category.toLowerCase() === 'quick and easy') {
            return this.getQuickAndEasy(callback);
        } else if (['starters', 'main', 'dessert'].includes(category.toLowerCase())) {
            return this.getByCourse(category, callback);
        } else {
            return this.getByTypeOfMeat(category, callback);
        }
    }

    static create(data, callback) {
        const sql = 'INSERT INTO recipes (name, type_of_meat, course, description, prepTime, image_url) VALUES (?,?,?,?,?,?)';
        const params = [data.name, data.type_of_meat, data.course, data.description, data.prepTime, data.image_url];
        db.run(sql, params, function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    static update(id, data, callback) {
        const sql = `UPDATE recipes SET 
                     name = COALESCE(?,name), 
                     type_of_meat = COALESCE(?,type_of_meat), 
                     course = COALESCE(?,course), 
                     description = COALESCE(?,description),
                     prepTime = COALESCE(?,prepTime),
                     image_url = COALESCE(?,image_url)
                     WHERE recipe_id = ?`;
        const params = [data.name, data.type_of_meat, data.course, data.description, data.prepTime, data.image_url, id];
        db.run(sql, params, function (err) {
            callback(err, this ? this.changes : null);
        });
    }

    static delete(id, callback) {
        const sql = "DELETE FROM recipes WHERE recipe_id = ?";
        const params = [id];
        db.run(sql, params, function (err) {
            callback(err, this ? this.changes : null);
        });
    }
}

export default Recipe;
