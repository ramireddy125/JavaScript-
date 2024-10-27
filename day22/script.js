// Function to update the wishlist count above the button
function updateWishlistCount() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    document.getElementById("wishlist-count").innerText = wishlist.length;
}

async function apicall() {
    var res = await fetch("https://fakestoreapi.com/products/");
    var apidata = await res.json();

    // Using map method to process and append each product to the DOM
    apidata.map((val) => {
        var row = document.getElementById("row");

        // Creating elements for the product card
        var main = document.createElement("div");
        main.classList.add("product-card");

        var img = document.createElement("img");
        img.src = val.image; // Product image

        var title = document.createElement("h3");
        title.innerText = val.title; // Product title

        var price = document.createElement("p");
        price.innerText = "Price: $" + val.price; // Product price

        var rating = document.createElement("p");
        rating.classList.add("rating");
        rating.innerText = "Rating: " + (Math.random() * (5 - 2) + 2).toFixed(1); // Fake rating (for demo)

        // Adding 'Add to Wishlist' button
        var addToWishlist = document.createElement("button");
        addToWishlist.classList.add("add-to-wishlist");
        addToWishlist.innerText = "Add to Wishlist";
        addToWishlist.onclick = function() {
            addToLocalStorage(val);
        };

        // Append elements to the main product card
        main.append(img, title, price, rating, addToWishlist);
        row.appendChild(main); // Append the card to the row
    });
}

// Function to add product data to localStorage when 'Add to Wishlist' is clicked
function addToLocalStorage(product) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(product); // Add the product to the array
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Update localStorage
    alert(product.title + " has been added to your wishlist!");

    // Update wishlist count after adding a product
    updateWishlistCount();
}

// Function to view the wishlist
function viewWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.length > 0) {
        console.log("Wishlist:", wishlist);
        alert("Check console for wishlist items!");
    } else {
        alert("Your wishlist is empty!");
}

// Call the API function on page load
apicall();

// Update the wishlist count when the page is loaded
updateWishlistCount();
}