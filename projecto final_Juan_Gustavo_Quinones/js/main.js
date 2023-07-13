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
                activateAllButtonsClick(items); // Pass the items array to the function
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
          <button class="btn btn-primary" id="${product.code}">Add to Cart</button>
        </div>
      </div>
    </div>`;
}

// Function to handle click events on the "Add to Cart" buttons
function activateAllButtonsClick(items) { // Receive the items array as a parameter
    const buttons = document.querySelectorAll("button.btn.btn-primary");
    for (let button of buttons) {
        button.addEventListener("click", (e) => {
            const chosenItems = items.find((product) => product.code === e.target.id);
            cart.push(chosenItems);
            localStorage.setItem("cart", JSON.stringify(cart));
            console.clear();
            saveCartItems();
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: `The product ${chosenItems.name} has been successfully added to the cart.`,
                showConfirmButton: false, // Hide the 'OK' button
                timer: 3000, // Automatically close the popup after 3 seconds (adjust as needed)
                timerProgressBar: true // Show a progress bar indicating the remaining time
            });

        });
    }
}

// Function to save the cart items to local storage
function saveCartItems() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Retrieve the cart items from local storage or initialize an empty array
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Call the loadProducts function to initiate loading the products
loadProducts();



















