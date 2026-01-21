// Items and their prices
const items = {
    "Pen": 10, "Notebook": 50, "Pencil": 5, "Eraser": 3, "Marker": 20,
    "Highlighter": 15, "Stapler": 80, "Glue": 25, "Ruler": 12, "Sharpener": 8,
    "Scissors": 30, "Folder": 40, "Calculator": 500, "Paper Pack": 60, "Desk Organizer": 150,
    "Backpack": 800, "Water Bottle": 100, "Lunch Box": 120, "Mouse": 350, "Keyboard": 450,
    "Headphones": 600, "USB Drive": 250, "Charger": 400, "Notebook Laptop": 60000, "Chair": 2000,
    "Table": 3500, "Lamp": 500, "Speaker": 1200, "Book": 250, "Diary": 300,
    "Sketchbook": 150, "Paint Set": 400, "Canvas": 350, "Bag": 900, "Socks": 50,
    "Shoes": 1500, "T-shirt": 400, "Jeans": 1200, "Watch": 2500
};

// Populate dropdown
const itemSelect = document.getElementById("itemSelect");
for (let key in items) {
    let option = document.createElement("option");
    option.value = key;
    option.text = key;
    itemSelect.appendChild(option);
}

// Cart array
let cart = [];

// Add item to cart
function addItem() {
    let name = itemSelect.value;
    let qty = Number(document.getElementById("itemQty").value);

    if (!name || qty <= 0) {
        alert("Please select a valid item and quantity.");
        return;
    }

    let price = items[name]; // Get price from items object

    // Check if item exists in cart
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty += qty; // Increase quantity
        existingItem.price = price; // Update price
    } else {
        cart.push({ name, price, qty });
    }

    displayCart();

    // Reset dropdown and quantity
    itemSelect.value = "";
    document.getElementById("itemQty").value = 1;
}

// Display cart
function displayCart() {
    let list = document.getElementById("cartList");
    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;

        list.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.qty}</td>
                <td>₹${subtotal}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total").innerText = total;
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

function confirmPurchase() {
    if (cart.length === 0) {
        alert("Please add items to cart before confirming purchase!");
        return; // stop here, no redirect
    }

    // if cart has items
    window.location.href = "thanks.html";
}