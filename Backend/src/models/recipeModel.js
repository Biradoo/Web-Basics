import db from '../database.js';

export const getAllRecipes = (filters = {}) => {
    let sql = "SELECT * FROM recipes";
    const params = [];

    const conditions = [];
    if (filters.type_of_meat) {
        conditions.push("type_of_meat = ?");
        params.push(filters.type_of_meat);
    }
    if (filters.prepTime) {
        conditions.push("prepTime <= ?");
        params.push(filters.prepTime);
    }
    if (filters.course) {
        conditions.push("course = ?");
        params.push(filters.course);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    console.log('SQL Query:', sql); // Debugging line
    console.log('Parameters:', params); // Debugging line


    return db.prepare(sql).all(...params);
};


export const getRecipeById = (id) => {
    const sql = "SELECT * FROM recipes WHERE recipe_id = ?";
    return db.prepare(sql).get(id);
};

export const getReviewsByRecipeId = (id) => {
    const sql = "SELECT * FROM reviews WHERE recipe_id = ?";
    return db.prepare(sql).all(id);
};

export const createRecipe = (data) => {
    const sql = 'INSERT INTO recipes (name, type_of_meat, course, description, prepTime, image_url) VALUES (?, ?, ?, ?, ?, ?)';
    const result = db.prepare(sql).run(data.name, data.type_of_meat, data.course, data.description, data.prepTime, data.image_url);
    return result.lastInsertRowid;
};

export const updateRecipe = (id, data) => {
    const sql = `UPDATE recipes SET 
                 name = COALESCE(?, name), 
                 type_of_meat = COALESCE(?, type_of_meat), 
                 course = COALESCE(?, course), 
                 description = COALESCE(?, description),
                 prepTime = COALESCE(?, prepTime),
                 image_url = COALESCE(?, image_url)
                 WHERE recipe_id = ?`;
    const result = db.prepare(sql).run(data.name, data.type_of_meat, data.course, data.description, data.prepTime, data.image_url, id);
    return result.changes;
};

export const deleteRecipe = (id) => {
    const sql = "DELETE FROM recipes WHERE recipe_id = ?";
    const result = db.prepare(sql).run(id);
    return result.changes;
};
