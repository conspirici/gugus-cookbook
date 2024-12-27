const app = {
    pages: {
        home: document.getElementById('home'),
        recipes: document.getElementById('recipes'),
        recipeDetail: document.getElementById('recipe-detail')
    },
    elements: {
        startCooking: document.getElementById('start-cooking'),
        recipeList: document.getElementById('recipe-list'),
        backToHome: document.getElementById('back-to-home'),
        backToRecipes: document.getElementById('back-to-recipes'),
        recipeTitle: document.getElementById('recipe-title'),
        recipeTime: document.getElementById('recipe-time'),
        recipeCategory: document.getElementById('recipe-category'),
        ingredientCount: document.getElementById('ingredient-count'),
        ingredientList: document.getElementById('ingredient-list'),
        stepList: document.getElementById('step-list')
    },
    data: {
        recipes: [
            {
                id: 1,
                title: 'veg n cheese casserole',
                category: 'Bakistry',
                duration: '1 hour',
                image: 'assets/WhatsApp Image 2024-12-27 at 11.43.01 PM.jpeg',
                ingredients: [
                    { name: 'Potatoes', amount: '2-3', color: '#FADADD', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.55 PM.jpeg' },
                    { name: 'Cabbage', amount: '1', color: '#D8E7DC', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.52 PM.jpeg' },
                    { name: 'Salt', amount: 'to taste', color: '#E3F2F9', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.53 PM (1).jpeg' },
                    { name: 'Carrot', amount: '1', color: '#FAD4B1', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.53 PM.jpeg' },
                    { name: 'Cheese', amount: 'generous amount', color: '#FFF5E4', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.52 PM (1).jpeg' },
                    { name: 'Paprika', amount: 'as per liking', color: '#E6E6E6', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.51 PM.jpeg' },
                    { name: 'Broccoli', amount: '1', color: '#FDE2D0', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.51 PM (1).jpeg' },
                    { name: 'Cream', amount: 'for sauce', color: '#FADADD', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.50 PM.jpeg' },
                    { name: 'Milk', amount: 'for sauce', color: '#FFF5E4', image: 'assets/WhatsApp Image 2024-12-27 at 11.53.49 PM.jpeg' },
                    { name: 'Black Pepper', amount: 'to taste', color: '#E6E6E6', image: 'assets/WhatsApp Image 2024-12-27 at 11.43.01 PM.jpeg' }
                ],
                steps: [
                    "Start by boiling the potatoes in a pot of water until they are soft and tender. Once cooked, drain the water and mash the potatoes until smooth.",
                    "While the potatoes are boiling, heat a fry pan over medium heat. Add a little oil and sauté the carrots, cabbage, and broccoli. Season with salt and paprika to taste, and cook until the vegetables are tender but still slightly crisp.",
                    "In a mixing bowl, prepare the cheese sauce by combining cheese, milk, and cream. Season the mixture with salt and black pepper, and whisk until smooth.",
                    "Preheat your oven to 375°F (190°C).",
                    "Take a baking tray and spread the mashed potatoes evenly across the bottom as the first layer.",
                    "Add the sautéed vegetables on top of the mashed potatoes, creating a colorful second layer.",
                    "Pour the prepared cheese sauce evenly over the vegetable layer, ensuring it covers everything well.",
                    "Sprinkle shredded cheese generously over the top as the final layer.",
                    "Place the baking tray in the preheated oven and bake for 20-25 minutes, or until the top layer of cheese is golden and bubbly.",
                    "Once baked, remove the dish from the oven and let it cool slightly before serving. Enjoy your delicious baked casserole!"
                ]
            }
        ]
    },
    init() {
        this.bindEvents();
        this.renderRecipeList();
    },
    bindEvents() {
        this.elements.startCooking.addEventListener('click', () => this.showPage('recipes'));
        this.elements.backToHome.addEventListener('click', () => this.showPage('home'));
        this.elements.backToRecipes.addEventListener('click', () => this.showPage('recipes'));
    },
    showPage(pageId) {
        Object.values(this.pages).forEach(page => page.classList.remove('active'));
        this.pages[pageId].classList.add('active');
    },
    renderRecipeList() {
        this.elements.recipeList.innerHTML = this.data.recipes.map(recipe => `
            <div class="recipe-item" data-id="${recipe.id}">
                <div class="recipe-item-image">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </div>
                <div class="recipe-item-info">
                    <h3 class="recipe-item-title">${recipe.title}</h3>
                    <p class="recipe-item-category">${recipe.category}</p>
                </div>
                <i class="fas fa-chevron-right"></i>
            </div>
        `).join('');

        this.elements.recipeList.querySelectorAll('.recipe-item').forEach(item => {
            item.addEventListener('click', () => this.showRecipeDetail(item.dataset.id));
        });
    },
    showRecipeDetail(recipeId) {
        const recipe = this.data.recipes.find(r => r.id === parseInt(recipeId));
        if (!recipe) return;

        this.elements.recipeTitle.textContent = recipe.title;
        this.elements.recipeTime.textContent = recipe.duration;
        this.elements.recipeCategory.textContent = recipe.category;
        this.elements.ingredientCount.textContent = recipe.ingredients.length;

        // Update recipe header to include image
        document.querySelector('.recipe-header').innerHTML = `
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
            <div class="recipe-info">
                <h1 id="recipe-title">${recipe.title}</h1>
                <div class="recipe-time">
                    <i class="fas fa-clock"></i>
                    <span>${recipe.duration}</span>
                </div>
            </div>
        `;

        this.elements.ingredientList.innerHTML = recipe.ingredients.map(ingredient => `
            <div class="ingredient-item" style="background-color: ${ingredient.color}">
                <img src="${ingredient.image}" alt="${ingredient.name}" class="ingredient-image">
                <div class="ingredient-info">
                    <h3>${ingredient.name}</h3>
                    <p>${ingredient.amount}</p>
                </div>
            </div>
        `).join('');

        this.elements.stepList.innerHTML = recipe.steps.map(step => `<li>${step}</li>`).join('');

        this.showPage('recipeDetail');
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
