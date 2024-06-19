document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type_of_meat = urlParams.get('type_of_meat');
    const course = urlParams.get('course');
    const prepTime = urlParams.get('prepTime');

    const filters = { type_of_meat, course, prepTime };
    console.log('Filters from URL:', filters); // Debugging line
    fetchRecipes(filters);
});

async function fetchRecipes(filters = {}) {
    try {
        let url = 'http://localhost:3000/api/recipes';
        const params = new URLSearchParams();

        if (filters.type_of_meat) {
            params.append('type_of_meat', filters.type_of_meat);
        }
        if (filters.prepTime) {
            params.append('prepTime', filters.prepTime);
        }
        if (filters.course) {
            params.append('course', filters.course);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        console.log('Fetching URL:', url); // Debugging line


        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const recipes = await response.json();
        console.log('Fetched recipes:', recipes.data); // Debugging line

        displayRecipes(recipes.data, 'recipe-grid');
    } catch (error) {
        displayError(`Error fetching recipes: ${error.message}`);
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
