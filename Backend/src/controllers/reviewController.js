import Review from '../models/reviewModel.js';

export const getAllReviews = (req, res) => {
    Review.getAll((err, rows) => {
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

export const getReviewById = (req, res) => {
    Review.getById(req.params.id, (err, row) => {
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

export const getReviewsByRecipeId = (req, res) => {
    Review.getByRecipeId(req.params.recipeId, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
};

export const createReview = (req, res) => {
    const data = {
        recipe_id: req.body.recipe_id,
        rating: req.body.rating,
        comment: req.body.comment,
        date: new Date().toISOString().split('T')[0]
    };
    Review.create(data, (err, id) => {
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

export const updateReview = (req, res) => {
    const data = {
        rating: req.body.rating,
        comment: req.body.comment
    };
    Review.update(req.params.id, data, (err, changes) => {
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

export const deleteReview = (req, res) => {
    Review.delete(req.params.id, (err, changes) => {
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
