// Function to load cart items from localStorage
function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  return cartItems;
}

// Function to save cart items to localStorage
function saveCartItems(cartItems) {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to calculate the total price of the cart items
function calculateTotal(cartItems) {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price;
  });
  return total;
}

// Function to render the cart table
function renderCart(cartItems) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  cartItems.forEach((item) => {
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.textContent = item.name;
    tr.appendChild(nameTd);
    const priceTd = document.createElement('td');
    priceTd.textContent = `$ ${item.price}`;
    tr.appendChild(priceTd);
    const deleteTd = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'delete');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.code = item.code;
    deleteTd.appendChild(deleteButton);
    tr.appendChild(deleteTd);
    tbody.appendChild(tr);
  });

  const total = calculateTotal(cartItems);
  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total: $ ${total.toFixed(2)}`;
}

// Function to handle the click event on the delete button
function handleDeleteButton(e, cartItems) {
  const code = e.target.dataset.code;

  // Find the index of the item with the matching code in the cartItems array
  const itemIndex = cartItems.findIndex((item) => item.code === code);

  if (itemIndex !== -1) {
    // Remove the item from the cartItems array
    cartItems.splice(itemIndex, 1);

    // Save the updated cart items to localStorage
    saveCartItems(cartItems);

    // Re-render the cart
    renderCart(cartItems);

    // Show a success message
    Swal.fire({
      icon: 'success',
      title: 'Item removed',
      text: 'The item has been successfully removed from the cart.',
    });
  }
}

// Retrieve the cart items from localStorage
const cartItems = loadCartItems();

// Render the cart on page load
renderCart(cartItems);

// Add event listener to the delete button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    handleDeleteButton(e, cartItems);
  }
});





