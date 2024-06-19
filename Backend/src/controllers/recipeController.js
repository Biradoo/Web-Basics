import Recipe from '../models/recipeModel.js';

export const getAllRecipes = (req, res) => {
    const { category } = req.query;

    if (category) {
        Recipe.getByCategory(category, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            });
        });
    } else {
        Recipe.getAll((err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            });
        });
    }
};

export const getRecipeById = (req, res) => {
    Recipe.getById(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
};

export const getReviewsForRecipe = (req, res) => {
    Recipe.getReviewsById(req.params.id, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (rows.length === 0) {
            res.status(404).json({ "error": "No recipe found" });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
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

    Recipe.create(data, (err, id) => {
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

export const updateRecipe = (req, res) => {
    const data = {
        name: req.body.name,
        type_of_meat: req.body.type_of_meat,
        course: req.body.course,
        description: req.body.description,
        prepTime: req.body.prepTime,
        image_url: req.body.image_url
    };
    Recipe.update(req.params.id, data, (err, changes) => {
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

export const deleteRecipe = (req, res) => {
    Recipe.delete(req.params.id, (err, changes) => {
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
