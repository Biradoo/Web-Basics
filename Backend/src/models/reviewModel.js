import db from '../database.js';

class Review {
    static getAll(callback) {
        const sql = "SELECT * FROM reviews";
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    }

    static getById(id, callback) {
        const sql = "SELECT * FROM reviews WHERE review_id = ?";
        const params = [id];
        db.get(sql, params, (err, row) => {
            callback(err, row);
        });
    }

    static getByRecipeId(recipeId, callback) {
        const sql = "SELECT * FROM reviews WHERE recipe_id = ?";
        const params = [recipeId];
        db.all(sql, params, (err, rows) => {
            callback(err, rows);
        });
    }

    static create(data, callback) {
        const sql = 'INSERT INTO reviews (recipe_id, rating, comment, date) VALUES (?,?,?,?)';
        const params = [data.recipe_id, data.rating, data.comment, data.date];
        db.run(sql, params, function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    static update(id, data, callback) {
        const sql = `UPDATE reviews SET 
                     rating = COALESCE(?,rating), 
                     comment = COALESCE(?,comment)
                     WHERE review_id = ?`;
        const params = [data.rating, data.comment, id];
        db.run(sql, params, function (err) {
            callback(err, this ? this.changes : null);
        });
    }

    static delete(id, callback) {
        const sql = "DELETE FROM reviews WHERE review_id = ?";
        const params = [id];
        db.run(sql, params, function (err) {
            callback(err, this ? this.changes : null);
        });
    }
}

export default Review;
