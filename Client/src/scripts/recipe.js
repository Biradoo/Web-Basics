document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    if (recipeId) {
        fetchRecipeDetails(recipeId);
        fetchIngredients(recipeId);
        fetchReviews(recipeId);
    }

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault();
            submitReview(recipeId);
        });
    }

    const editRecipeForm = document.getElementById('edit-recipe-form');
    if (editRecipeForm) {
        editRecipeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            submitEditRecipe(recipeId);
        });
    }

    const editReviewForm = document.getElementById('edit-review-form');
    if (editReviewForm) {
        editReviewForm.addEventListener('submit', (event) => {
            event.preventDefault();
            submitEditReview();
        });
    }

    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModify);
    });

    window.onclick = function (event) {
        const editReviewModify = document.getElementById('editReviewModify');
        if (event.target == editReviewModify) {
            editReviewModify.style.display = 'none';
        }

        const editRecipeModal = document.getElementById('editRecipeModal');
        if (event.target == editRecipeModal) {
            editRecipeModal.style.display = 'none';
        }
    };
});

async function fetchRecipeDetails(recipeId) {
    try {
        const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const recipe = await response.json();
        displayRecipeDetails(recipe.data);
    } catch (error) {
        displayError(`Error fetching recipe details: ${error.message}`);
        console.error('Error fetching recipe details:', error);
    }
}

async function fetchReviews(recipeId) {
    try {
        const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}/reviews`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const reviews = await response.json();
        console.log('Fetched reviews:', reviews.data); // Debugging line
        displayReviews(reviews.data);
    } catch (error) {
        displayError(`Error fetching reviews: ${error.message}`);
        console.error('Error fetching reviews:', error);
    }
}

async function fetchIngredients(recipeId) {
    try {
        console.log(`Fetching ingredients for recipe ID: ${recipeId}`); // Debugging line

        const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}/ingredients`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const ingredients = await response.json();
        console.log('Fetched ingredients:', ingredients.data); // Debugging line
        displayIngredients(ingredients.data);
    } catch (error) {
        displayError(`Error fetching ingredients: ${error.message}`);
        console.error('Error fetching ingredients:', error);
    }
}

async function getReviewById(reviewId) {
    try {
        const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const review = await response.json();
        return review.data;
    } catch (error) {
        displayError(`Error fetching review: ${error.message}`);
        console.error('Error fetching review:', error);
    }
}

function displayRecipeDetails(recipe) {
    const recipeDetails = document.getElementById('individual-recipe-details');
    if (recipeDetails) {
        recipeDetails.innerHTML = `
            <img src="${recipe.image_url}" alt="Recipe image">
            <h2>${recipe.name}</h2>
            <p>${recipe.description}</p>
            <p><strong>Type of Meat:</strong> ${recipe.type_of_meat}</p>
            <p><strong>Course:</strong> ${recipe.course}</p>
            <p><strong>Preparation Time:</strong> ${recipe.prepTime} minutes</p>
        `;
    }
}

function displayReviews(reviews) {
    const reviewsSection = document.getElementById('reviews-section');
    console.log('Displaying reviews', reviews); // Debugging line
    if (reviewsSection) {
        reviewsSection.innerHTML = '<h2>Reviews</h2>';
        if (Array.isArray(reviews) && reviews.length > 0 || typeof reviews === 'object') {
            if (!Array.isArray(reviews)) {
                reviews = [reviews]; // Convert single review object to an array
            }
            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `
                    <p><strong>Rating:</strong> ${review.rating}</p>
                    <p>${review.comment}</p>
                    <p><em>${review.date}</em></p>
                    <button class="edit-button" onclick="openEditModify(${review.review_id})">Edit</button>
                    <button class="delete-button" onclick="deleteReview(${review.review_id}, ${review.recipe_id})">Delete</button>
                `;
                reviewsSection.appendChild(reviewDiv);
            });
        } else {
            reviewsSection.innerHTML += '<p>No reviews yet.</p>';
        }
    }
}

function displayIngredients(ingredients) {
    const ingredientsSection = document.getElementById('recipe-ingredients');
    console.log('Displaying ingredients', ingredients); // Debugging line
    if (ingredientsSection) {
        ingredientsSection.innerHTML = '<h2>Ingredients</h2>';
        if (Array.isArray(ingredients) && ingredients.length > 0) {
            ingredients.forEach(ingredient => {
                const ingredientDiv = document.createElement('div');
                ingredientDiv.classList.add('ingredient');
                ingredientDiv.innerHTML = `
                    <p>${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}</p>
                `;
                ingredientsSection.appendChild(ingredientDiv);
            });
        } else {
            ingredientsSection.innerHTML += '<p>No ingredients listed.</p>';
        }
    }
}


async function submitReview(recipeId) {
    try {
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;
        const data = {
            recipe_id: recipeId,
            rating: rating,
            comment: comment,
            date: new Date().toISOString().split('T')[0]
        };
        console.log('Submitting review with data:', data); // Debugging line
        const response = await fetch('http://localhost:3000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Review submitted:', result);
        location.reload();
    } catch (error) {
        displayError(`Error submitting review: ${error.message}`);
        console.error('Error submitting review:', error);
    }
}
function displayError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-message');
    errorContainer.textContent = message;
    document.body.insertBefore(errorContainer, document.body.firstChild);
}
function openEditModify(reviewId) {
    getReviewById(reviewId).then(review => {
        const modify = document.getElementById('editReviewModify');

        document.getElementById('edit-review-id').value = review.review_id;
        document.getElementById('edit-rating').value = review.rating;
        document.getElementById('edit-comment').value = review.comment;

        modify.style.display = 'block';
    }).catch(error => {
        displayError(`Error fetching review for edit: ${error.message}`);
        console.error('Error fetching review for edit:', error);
    });
}

async function submitEditReview() {
    const reviewId = document.getElementById('edit-review-id').value;
    const rating = document.getElementById('edit-rating').value;
    const comment = document.getElementById('edit-comment').value;

    const data = {
        rating: rating,
        comment: comment
    };

    try {
        const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Review updated');
        location.reload();
    } catch (error) {
        displayError(`Error updating review: ${error.message}`);
        console.error('Error updating review:', error);
    }
}

async function deleteReview(reviewId, recipeId) {
    try {
        const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Review deleted');
        fetchReviews(recipeId); // Refresh the reviews list
    } catch (error) {
        displayError(`Error deleting review: ${error.message}`);
        console.error('Error deleting review:', error);
    }
}

async function deleteRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Recipe deleted');
        window.location.href = 'recipes.html';
    } catch (error) {
        displayError(`Error deleting recipe: ${error.message}`);
        console.error('Error deleting recipe:', error);
    }
}

function openEditRecipe() {
    const modify = document.getElementById('editRecipeModal');
    const recipeDetails = document.getElementById('individual-recipe-details');

    document.getElementById('edit-description').value = recipeDetails.querySelector('p:nth-of-type(1)').textContent;

    modify.style.display = 'block';
}

async function submitEditRecipe(recipeId) {
    const data = {
        description: document.getElementById('edit-description').value
    };

    try {
        const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Recipe updated');
        location.reload();
    } catch (error) {
        displayError(`Error updating recipe: ${error.message}`);
        console.error('Error updating recipe:', error);
    }
}

function closeModify() {
    const modify = document.querySelectorAll('.modify');
    modify.forEach(modal => {
        modal.style.display = 'none';
    });
}
