import * as Ingredient from '../models/ingredientModel.js';

export const getAllIngredients = (req, res) => {
    try {
        const rows = Ingredient.getAllIngredients();
        res.status(200).json({
            "message": "success",
            "data": rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const getIngredientById = (req, res) => {
    try {
        const row = Ingredient.getIngredientById(req.params.id);
        res.status(200).json({
            "message": "success",
            "data": row
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const getIngredientsByRecipeId = (req, res) => {
    try {
        const ingredients = Ingredient.getIngredientsByRecipeId(req.params.recipeId);
        res.status(200).json({
            "message": "success",
            "data": ingredients
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const createIngredient = (req, res) => {
    const data = {
        recipe_id: req.body.recipe_id,
        name: req.body.name,
        unit: req.body.unit,
        quantity: req.body.quantity
    };
    try {
        const id = Ingredient.createIngredient(data);
        res.status(201).json({
            "message": "success",
            "data": data,
            "id": id
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const updateIngredient = (req, res) => {
    const data = {
        name: req.body.name,
        unit: req.body.unit,
        quantity: req.body.quantity
    };
    try {
        const changes = Ingredient.updateIngredient(req.params.id, data);
        res.status(200).json({
            "message": "success",
            "data": data,
            "changes": changes
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const deleteIngredient = (req, res) => {
    try {
        const changes = Ingredient.deleteIngredient(req.params.id);
        res.status(200).json({
            "message": "deleted",
            "changes": changes
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};
