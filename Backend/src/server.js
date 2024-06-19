import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './database.js';
import recipeRoutes from './routes/recipes.js';
import ingredientRoutes from './routes/ingredients.js';
import reviewRoutes from './routes/reviews.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to Recipe Haven API');
});

app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/reviews', reviewRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
