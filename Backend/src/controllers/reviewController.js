import * as Review from '../models/reviewModel.js';

export const getAllReviews = (req, res) => {
    try {
        const rows = Review.getAllReviews();
        res.status(200).json({
            "message": "success",
            "data": rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const getReviewById = (req, res) => {
    try {
        const row = Review.getReviewById(req.params.id);
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
        const rows = Review.getReviewsByRecipeId(req.params.recipeId);
        res.status(200).json({
            "message": "success",
            "data": rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const createReview = (req, res) => {
    const data = {
        recipe_id: req.body.recipe_id,
        rating: req.body.rating,
        comment: req.body.comment,
        date: new Date().toISOString().split('T')[0]
    };
    try {
        const id = Review.createReview(data);
        res.status(201).json({
            "message": "success",
            "data": data,
            "id": id
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const updateReview = (req, res) => {
    const data = {
        rating: req.body.rating,
        comment: req.body.comment
    };
    try {
        const changes = Review.updateReview(req.params.id, data);
        res.status(200).json({
            "message": "success",
            "data": data,
            "changes": changes
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};

export const deleteReview = (req, res) => {
    try {
        const changes = Review.deleteReview(req.params.id);
        res.status(200).json({
            "message": "deleted",
            "changes": changes
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
};
