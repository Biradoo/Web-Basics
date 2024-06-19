import express from 'express';
import * as ingredientController from '../controllers/ingredientController.js';
const router = express.Router();

router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.getIngredientById);
router.get('/', ingredientController.getIngredientsForRecipe);
router.post('/', ingredientController.createIngredient);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);

export default router;