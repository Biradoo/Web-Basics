document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    if (recipeId) {
        fetchRecipeDetails(recipeId);
        fetchReviews(recipeId);
    }

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault();
            submitReview(recipeId);
        });
    }
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
        console.error('Error fetching recipe details:', error);
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

async function fetchReviews(recipeId) {
    try {
        const response = await fetch(`http://localhost:3000/api/reviews/${recipeId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const reviews = await response.json();
        console.log('Fetched reviews:', reviews.data); // Debugging line
        displayReviews(reviews.data);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

function displayReviews(reviews) {
    const reviewsSection = document.getElementById('reviews-section');
    console.log('Displaying reviews',reviews); //debug
    if (reviewsSection) {
        reviewsSection.innerHTML = '<h2>Reviews</h2>';
        if (Array.isArray(reviews) && reviews.length > 0 || typeof reviews === 'object') {
            if (!Array.isArray(reviews)) {
                reviews = [reviews]; //Convert single review object to an array
            }
            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `
                    <p><strong>Rating:</strong> ${review.rating}</p>
                    <p>${review.comment}</p>
                    <p><em>${review.date}</em></p>
                `;
                reviewsSection.appendChild(reviewDiv);
            });
        } else {
            reviewsSection.innerHTML += '<p>No reviews yet.</p>';
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
        console.error('Error submitting review:', error);
    }
}
