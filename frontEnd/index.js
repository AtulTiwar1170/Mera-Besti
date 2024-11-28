// function swipper() {
//     let swiper = new Swiper(".mySwiper", {
//         spaceBetween: 30,
//         centeredSlides: true,
//         autoplay: {
//             delay: 2500,
//             disableOnInteraction: false,
//         },
//         pagination: {
//             el: ".swiper-pagination",
//             clickable: true,
//         },
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//     });
// }
// swipper();


// Sample product data
const products = async () => {
    try {
        const response = await fetch("../assets/products.json"); 
        const products = await response.json();
        renderProducts(products)
        
        return products;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

products()

function renderProducts(product) {
    const productGrid = document.querySelector(".product-grid");

    if (!product || product.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    productGrid.innerHTML = product
        .map(
            (product) => `
        <div class="product-card">
            <div class="product-image"><img src="${product.imageUrl}" alt="${product.name}"></div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${"&#8377"} ${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `
        )
        .join("");
}



// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);

    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            alert("Product added to cart!");
        });
    });

    // Search functionality
    const searchInput = document.querySelector(".search-bar input");
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
});
