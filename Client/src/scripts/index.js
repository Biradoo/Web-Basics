document.addEventListener("DOMContentLoaded", () => {
    fetchRecipes();

    const categoryLinks = document.querySelectorAll('.category a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', handleCategoryClick);
    });
});

async function fetchRecipes() {
    try {
        const response = await fetch('http://localhost:3000/api/recipes');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const recipes = await response.json();
        displayRecipes(recipes.data, 'recipe-examples');
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes, elementId) {
    const container = document.getElementById(elementId);
    if (container) {
        container.innerHTML = '';
    }

    let displayedCount = 0;
    recipes.forEach(recipe => {
        if (displayedCount < 6 || recipe.grid) {
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
            displayedCount++;
        }
    });
}

function handleCategoryClick(event) {
    event.preventDefault();
    const type = this.dataset.type;
    const value = this.dataset.value;
    window.location.href = `recipes.html?${type}=${encodeURIComponent(value)}`;
}
