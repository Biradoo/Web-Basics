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
    window.location.href = `recipes.html?${type}=${encodeURIComponent(value)}`;
}
