import Ingredient from '../models/ingredientModel.js';


export const getAllIngredients = (req, res) => {
    Ingredient.getAll((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
};

export const getIngredientById = (req, res) => {
    Ingredient.getById(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ "message": "Ingredient not found" });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
};

export const getIngredientsForRecipe = (req, res) => {
    Ingredient.getByRecipeId(req.query.recipe_id, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (rows.length === 0) {
            res.status(404).json({ "message": "No ingredients found for this recipe" });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
};

export const createIngredient = (req, res) => {
    const data = {
        recipe_id: req.body.recipe_id,
        name: req.body.name,
        unit: req.body.unit,
        quantity: req.body.quantity
    };
    Ingredient.create(data, (err, id) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": id
        });
    });
};

export const updateIngredient = (req, res) => {
    const data = {
        name: req.body.name,
        unit: req.body.unit,
        quantity: req.body.quantity
    };
    Ingredient.update(req.params.id, data, (err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "changes": changes
        });
    });
};

export const deleteIngredient = (req, res) => {
    Ingredient.delete(req.params.id, (err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "deleted",
            "changes": changes
        });
    });
};
