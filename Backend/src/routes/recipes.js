import express from 'express';
import * as recipeController from '../controllers/recipeController.js';
import {getIngredientsByRecipeId} from '../controllers/ingredientController.js';
const router = express.Router();

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.get('/:id/reviews', recipeController.getReviewsByRecipeId);
router.get('/:id/ingredients', getIngredientsByRecipeId);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

export default router;
