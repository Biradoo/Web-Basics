document.addEventListener("DOMContentLoaded", () => {
    const categoryLinks = document.querySelectorAll('.category a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', handleCategoryClick);
    });
});

function handleCategoryClick(event) {
    event.preventDefault();
    const type = this.dataset.type;
    const value = this.dataset.value;
    console.log('Clicked category:', { type, value }); // Debugging line
    window.location.href = `recipes.html?${type}=${encodeURIComponent(value)}`;
}
