document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------
     Items Page Functionality
     ------------------------- */
  const addButtons = document.querySelectorAll(".item button");

  if (addButtons.length > 0) {
    // Retrieve any previously saved order or create a new array
    let order = JSON.parse(localStorage.getItem("orderItems")) || [];

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get the parent .item element
        const itemElement = button.closest(".item");
        const title = itemElement.querySelector("h2").innerText;
        // Extract the price as a number (remove the "$" sign)
        const priceText = itemElement.querySelector(".price").innerText;
        const price = parseFloat(priceText.replace("$", ""));
        
        // Create an order item object
        const orderItem = { title, price };

        // Add the item to the order array and save to local storage
        order.push(orderItem);
        localStorage.setItem("orderItems", JSON.stringify(order));

        // Notify the user and log the updated order
        alert(`${title} has been added to your order.`);
        console.log("Current order:", order);
      });
    });
  }
  //Search functionality
  function searchItems(query){
      const filterItems = items.filter(item => 
          item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
      renderItems(filterItems,"itemList");
  }
  
  //Add EventListner to button
  document.getElementById("searchButton")?.addEventListener("click",() => {
      const query = document.getElementById("itemSearch").value;
      searchItems(query);
  })
  //Render items in cart

function renderCart(){
  const cart = JSON.parse(localStorage.getItem("cart"))||[];
  const container = document.getElementById("cartItems");
  container.innerHTML="";
  if(cart.length == 0){
      container.innerHTML="<h1>Your Cart is Empty</h1>"
  }
  cart.forEach(item => {
      const cartDiv = document.createElement("div");
      cartDiv.classList.add("cart-item");
      cartDiv.innerHTML=`
      <img src="${item.Image}"/>
      <h3>${item.name}</h3>
      <h2>${item.price}</h2>
      <button onclick="removeFromCart(${item.id})">Remove</button>
      `
      container.appendChild(cartDiv);
  })
  renderSubtotal(cart);
}
  /* -------------------------
     Orders Page Functionality
     ------------------------- */
  const ordersContainer = document.getElementById("orders-Items");
  if (ordersContainer) {
    // Retrieve the order items from local storage
    let orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];

    // If no items, display a friendly message
    if (orderItems.length === 0) {
      ordersContainer.innerHTML = "<p>You have not added any orders yet.</p>";
    } else {
      // Create a list to display order items
      const ul = document.createElement("ul");
      let subtotal = 0;

      orderItems.forEach((item) => {
        const li = document.createElement("li");
        // Format the price with two decimal places
        li.textContent = `${item.title} - $${item.price.toFixed(2)}`;
        ul.appendChild(li);
        subtotal += item.price;
      });

      ordersContainer.appendChild(ul);

      // Display the subtotal in the element with id "subtotal"
      const subtotalElement = document.getElementById("subtotal");
      if (subtotalElement) {
        subtotalElement.innerHTML = `<p>Subtotal: $${subtotal.toFixed(2)}</p>`;
      }
    }
  }
});
