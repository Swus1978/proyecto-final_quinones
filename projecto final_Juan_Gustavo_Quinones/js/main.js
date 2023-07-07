// Function to load products from items.json
function loadProducts() {
    fetch('js/items.json')
        .then((response) => response.json())
        .then((data) => {
            const items = data;
            // Process the items data
            const container = document.querySelector("#container");
            if (container) {
                container.innerHTML = ""; // Clear the container
                items.forEach((product) => {
                    container.innerHTML += createCardElement(product); // Render each product
                });
                activateAllButtonsClick(items);
            } else {
                console.error("Element with ID 'container' not found.");
            }
        })
        .catch((error) => {
            console.error('Error loading products:', error);
        });
}

// Function to create card element for a product
function createCardElement(product) {
    return `
    <div class="card col-3 fluid mb-5" style="width: 13rem;" id="card">
      <img src="${product.images}" class="card-img-top img-fluid img-thumbnail mt-3" alt="...">
      <div class="card-body">
        <div class="name"><p class="card-title">${product.name}</p></div>
        <div class="price"><p class="card-text">$ ${product.price}</p></div>
        <div class="buy mb-2 mt-3">
          <button class="btn btn-primary btn-sm" id="${product.code}">Add to Cart</button>
        </div>
      </div>
    </div>`;
}

// Function to handle click events on the "Add to Cart" buttons
function activateAllButtonsClick(items) {
    const buttons = document.querySelectorAll("button.btn.btn-primary");
    for (let button of buttons) {
        button.addEventListener("click", (e) => {
            const chosenItem = items.find((product) => product.code === e.target.id);
            const existingItem = shoppingCart.find((item) => item.code === chosenItem.code);

            if (!existingItem) {
                shoppingCart.push(chosenItem);
                saveCartItems();
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart',
                    text: `The product ${chosenItem.name} has been successfully added to the cart.`,
                });
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Already in Cart',
                    text: `The product ${chosenItem.name} is already in the cart.`,
                });
            }
        });
    }
}

// Retrieve the cart items from local storage
const shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save the cart items to local storage
function saveCartItems() {
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
}

// Call the loadProducts function to initiate loading the products
loadProducts();


















