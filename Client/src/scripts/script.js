document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    fetchRecipes(category);

    const categoryLinks = document.querySelectorAll('.category a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (handleCategoryClick) => {
        })
    })
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
        displayRecipes(recipes.data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipeExamples = document.getElementById('recipe-examples');
    if (recipeExamples) {
        recipeExamples.innerHTML = '';
    }

    const recipeGrid = document.getElementById('recipe-grid');
    if (recipeExamples) {
        recipeExamples.innerHTML = '';
    }

    let displayedCount = 0;
    recipes.forEach(recipe => {
        if (displayedCount < 6 || recipe.grid) {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe-card');
            recipeDiv.innerHTML = `
            <a href="#">
                <img src="${recipe.image_url}" alt="Recipe image" onerror="this.src='assets/beef-meat.jpeg';">
            </a>
            <div class="recipe-details">
                <h4>${recipe.name}</h4>
                <span>${recipe.description}</span>
            </div>
        `;

            if (recipeExamples) {
                recipeExamples.appendChild(recipeDiv);
            }

            if (recipeGrid) {
                recipeGrid.appendChild(recipeDiv);
            }

            displayedCount++;
        }
    });
}

function handleCategoryClick(event) {
    event.preventDefault();
    const type = this.dataset.type;
    const value = this.dataset.value;
    fetchRecipesByCategory(type, value);
}

async function fetchRecipesByCategory(type, value) {
    try {
        const response = await fetch(`http://localhost:3000/api/recipes?${type}=${value}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const recipes = await response.json();
        displayRecipes(recipes.data);
    } catch (error) {
        console.error('Error fetching recipes by category:', error);
    }
}


