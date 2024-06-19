import express from 'express';
import * as reviewController from '../controllers/reviewController.js';
const router = express.Router();


router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.get('/recipe/:recipeId', reviewController.getReviewsByRecipeId);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router;
