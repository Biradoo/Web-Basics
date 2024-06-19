import db from '../database.js';

export const getAllReviews = () => {
    const sql = "SELECT * FROM reviews";
    return db.prepare(sql).all();
};

export const getReviewById = (id) => {
    const sql = "SELECT * FROM reviews WHERE review_id = ?";
    return db.prepare(sql).get(id);
};

export const getReviewsByRecipeId = (recipeId) => {
    const sql = "SELECT * FROM reviews WHERE recipe_id = ?";
    return db.prepare(sql).all(recipeId);
};

export const createReview = (data) => {
    const sql = 'INSERT INTO reviews (recipe_id, rating, comment, date) VALUES (?, ?, ?, ?)';
    const result = db.prepare(sql).run(data.recipe_id, data.rating, data.comment, data.date);
    return result.lastInsertRowid;
};

export const updateReview = (id, data) => {
    const sql = `UPDATE reviews SET 
                 rating = COALESCE(?, rating), 
                 comment = COALESCE(?, comment)
                 WHERE review_id = ?`;
    const result = db.prepare(sql).run(data.rating, data.comment, id);
    return result.changes;
};

export const deleteReview = (id) => {
    const sql = "DELETE FROM reviews WHERE review_id = ?";
    const result = db.prepare(sql).run(id);
    return result.changes;
};
