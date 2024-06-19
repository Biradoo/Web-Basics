import db from '../database.js';

export const getAllIngredients = () => {
    const sql = "SELECT * FROM ingredients";
    return db.prepare(sql).all();
};

export const getIngredientById = (id) => {
    const sql = "SELECT * FROM ingredients WHERE ingredient_id = ?";
    return db.prepare(sql).get(id);
};

export const getIngredientsByRecipeId = (recipeId) => {
    const sql = "SELECT * FROM ingredients WHERE recipe_id = ?";
    return db.prepare(sql).all(recipeId);
};

export const createIngredient = (data) => {
    const sql = 'INSERT INTO ingredients (recipe_id, name, unit, quantity) VALUES (?, ?, ?, ?)';
    const result = db.prepare(sql).run(data.recipe_id, data.name, data.unit, data.quantity);
    return result.lastInsertRowid;
};

export const updateIngredient = (id, data) => {
    const sql = `UPDATE ingredients SET 
                 name = COALESCE(?, name), 
                 unit = COALESCE(?, unit), 
                 quantity = COALESCE(?, quantity)
                 WHERE ingredient_id = ?`;
    const result = db.prepare(sql).run(data.name, data.unit, data.quantity, id);
    return result.changes;
};

export const deleteIngredient = (id) => {
    const sql = "DELETE FROM ingredients WHERE ingredient_id = ?";
    const result = db.prepare(sql).run(id);
    return result.changes;
};
