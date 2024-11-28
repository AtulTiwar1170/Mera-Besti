
// Sample product data
const products = async () => {
    try {
        const response = await fetch("../assets/products.json")
        const products = await response.json();
        renderProductsTable(products)
        return products;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
products()

function renderProductsTable(product) {
    const tableBody = document.getElementById('productsTableBody');
    const numberOfProduct = document.querySelector(".content-area .stats-grid .stat-card .stat-number1")
    let num = product.length;


    if (num === 0 || num > 0) {
        numberOfProduct.innerHTML = num;
    } else {
        numberOfProduct.innerHTML = "0";
    }
    

    if (!product || product.length === 0) {
        tableBody.innerHTML = "<p>No products found.</p>";
        return;
    }

    tableBody.innerHTML = product.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>₹${product.price}</td>
                    <td>${product.status}</td>
                    <td>
                        <button onclick="editProduct(${product.id})" class="action-btn edit-btn">Edit</button>
                        <button onclick="deleteProduct(${product.id})" class="action-btn delete-btn">Delete</button>
                    </td>
                </tr>
            `).join('');
}



// Function to delete product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(product => product.id !== id);
        renderProductsTable(products);
    }
}

// Function to edit product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        const newName = prompt('Enter new name:', product.name);
        const newPrice = prompt('Enter new price:', product.price);
        if (newName && newPrice) {
            product.name = newName;
            product.price = newPrice;
            renderProductsTable();
        }
    }
}




// Add product form submission
document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        image: document.getElementById('productImage').value,
        status: 'In Stock'
    };
    products.push(newProduct);
    renderProductsTable();
    this.reset();
    toggleAddProductForm();
});



// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    renderProductsTable(products);
});
