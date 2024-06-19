import * as Recipe from '../models/recipeModel.js';

export const getAllRecipes = (req, res) => {
    try {
        const filters = {};

        if (req.query.type_of_meat) {
            filters.type_of_meat = req.query.type_of_meat;
        }
        if (req.query.prepTime) {
            filters.prepTime = req.query.prepTime;
        }
        if (req.query.course) {
            filters.course = req.query.course;
        }
        console.log('Filters:', filters); // Debugging line
        const rows = Recipe.getAllRecipes(filters);
        res.status(200).json({
            "message": "success",
            "data": rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const getRecipeById = (req, res) => {
    try {
        const row = Recipe.getRecipeById(req.params.id);
        res.status(200).json({
            "message": "success",
            "data": row
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const getReviewsByRecipeId = (req, res) => {
    try {
        const rows = Recipe.getReviewsByRecipeId(req.params.id);
        res.status(200).json({
            "message": "success",
            "data": rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const createRecipe = (req, res) => {
    const data = {
        name: req.body.name,
        type_of_meat: req.body.type_of_meat,
        course: req.body.course,
        description: req.body.description,
        prepTime: req.body.prepTime,
        image_url: req.body.image_url
    };
    try {
        const id = Recipe.createRecipe(data);
        res.status(201).json({
            "message": "success",
            "data": data,
            "id": id
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const updateRecipe = (req, res) => {
    const data = {
        name: req.body.name,
        type_of_meat: req.body.type_of_meat,
        course: req.body.course,
        description: req.body.description,
        prepTime: req.body.prepTime,
        image_url: req.body.image_url
    };
    try {
        const changes = Recipe.updateRecipe(req.params.id, data);
        res.status(200).json({
            "message": "success",
            "data": data,
            "changes": changes
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const deleteRecipe = (req, res) => {
    try {
        const changes = Recipe.deleteRecipe(req.params.id);
        res.status(200).json({
            "message": "deleted",
            "changes": changes
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};
