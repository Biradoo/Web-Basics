import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipes.js';
import ingredientRoutes from './routes/ingredients.js';
import reviewRoutes from './routes/reviews.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;


app.get('/', (req, res) => {
    res.send('Welcome to Recipe Haven API');
});

app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
