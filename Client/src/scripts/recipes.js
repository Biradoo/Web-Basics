document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    fetchRecipes(category);
});

async function fetchRecipes(category = '') {
    try {
        let url = 'http://localhost:3000/api/recipes';
        if (category) {
            url += `?category=${encodeURIComponent(category)}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const recipes = await response.json();
        displayRecipes(recipes.data, 'recipe-grid');
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes, elementId) {
    const container = document.getElementById(elementId);
    if (container) {
        container.innerHTML = '';
    }

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-card');
        recipeDiv.innerHTML = `
        <a href="recipe.html?id=${recipe.recipe_id}">
            <img src="${recipe.image_url}" alt="Recipe image" onerror="this.src='assets/beef-meat.jpeg';">
        </a>
        <div class="recipe-details">
            <h4>${recipe.name}</h4>
            <span>${recipe.description}</span>
        </div>
    `;
        container.appendChild(recipeDiv);
    });
}
