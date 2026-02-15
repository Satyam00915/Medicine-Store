// ========== Sample Products Data ==========
const products = [
    {
        id: 1,
        name: 'Aspirin 500mg',
        category: 'pain-relief',
        price: 45.99,
        originalPrice: 59.99,
        rating: 4.8,
        reviews: 256,
        icon: '💊',
        manufacturer: 'MediCorp',
        description: 'Effective pain relief and fever reducer. FDA approved.'
    },
    {
        id: 2,
        name: 'Vitamin C 1000mg',
        category: 'vitamins',
        price: 35.50,
        originalPrice: 49.99,
        rating: 4.9,
        reviews: 512,
        icon: '🥗',
        manufacturer: 'HealthPlus',
        description: 'Boost your immune system with pure Vitamin C supplements.'
    },
    {
        id: 3,
        name: 'Cough Syrup',
        category: 'cold-flu',
        price: 28.99,
        originalPrice: 39.99,
        rating: 4.5,
        reviews: 189,
        icon: '🤧',
        manufacturer: 'PharmaCare',
        description: 'Fast-acting cough relief for cold and flu symptoms.'
    },
    {
        id: 4,
        name: 'Digestive Enzymes',
        category: 'digestion',
        price: 52.00,
        originalPrice: 69.99,
        rating: 4.6,
        reviews: 134,
        icon: '🫖',
        manufacturer: 'WellnessLabs',
        description: 'Support healthy digestion with natural enzymes.'
    },
    {
        id: 5,
        name: 'Anti-Fungal Cream',
        category: 'skin-care',
        price: 32.50,
        originalPrice: 45.00,
        rating: 4.7,
        reviews: 98,
        icon: '🧴',
        manufacturer: 'DermaCare',
        description: 'Effective treatment for fungal skin infections.'
    },
    {
        id: 6,
        name: 'First Aid Kit',
        category: 'first-aid',
        price: 65.00,
        originalPrice: 89.99,
        rating: 4.8,
        reviews: 267,
        icon: '🩹',
        manufacturer: 'SafeGuard',
        description: 'Complete first aid kit for home and travel.'
    },
    {
        id: 7,
        name: 'Ibuprofen 400mg',
        category: 'pain-relief',
        price: 24.50,
        originalPrice: 34.99,
        rating: 4.7,
        reviews: 421,
        icon: '💊',
        manufacturer: 'MediCorp',
        description: 'Fast pain relief for headaches and body aches.'
    },
    {
        id: 8,
        name: 'Multivitamin Complex',
        category: 'vitamins',
        price: 42.99,
        originalPrice: 59.99,
        rating: 4.6,
        reviews: 334,
        icon: '🥗',
        manufacturer: 'VitaHealth',
        description: 'Complete daily nutrition with essential vitamins and minerals.'
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Load products on products page
    if (document.getElementById('productsGrid')) {
        displayProducts(products);
    }
    
    // Load featured products on homepage
    if (document.getElementById('featuredProducts')) {
        displayFeaturedProducts(products.slice(0, 4));
    }
});

// ========== Navigation & Menu ==========
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// ========== Product Card HTML Generator ==========
function generateProductCardHTML(product) {
    const discount = Math.round((1 - (product.price / product.originalPrice)) * 100);
    return `
        <div class="product-card">
            <div class="product-image">
                ${product.icon}
                ${discount > 0 ? `<div class="product-badge">-${discount}%</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category-tag">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">★★★★★</span> ${product.rating}
                </div>
                <div class="product-price">
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="current-price">₹${product.price}</span>
                </div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// ========== Display Products ==========
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = productsToDisplay.map(product => generateProductCardHTML(product)).join('');
    }
}

function displayFeaturedProducts(productsToDisplay) {
    const grid = document.getElementById('featuredProducts');
    if (grid) {
        grid.innerHTML = productsToDisplay.map(product => generateProductCardHTML(product)).join('');
    }
}

// ========== Category Filter ==========
function filterProducts(category) {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
    window.location.href = 'products.html';
}

// ========== Cart Management ==========
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            icon: product.icon
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        saveCart();
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => el.textContent = count);
}

// ========== Display Cart ==========
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        updateCartSummary();
        return;
    }

    cartItemsContainer.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>₹${item.price.toFixed(2)} each</p>
                <div class="cart-item-details">
                    <span>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-selector">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" min="1">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

function updateCartSummary() {
    if (!document.getElementById('subtotal')) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

// ========== Notifications ==========
function showNotification(message) {
    // Simple notification (no external library needed)
    console.log(message);
    
    // Optional: Create a toast notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #0f7d9d;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== Checkout ==========
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            // For demo purposes, show checkout confirmation
            alert('Thank you for your order! Checkout feature coming soon.');
        });
    }
});

// ========== Product Tabs ==========
function switchTab(tabName) {
    // Hide all tabs
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedPane = document.getElementById(tabName);
    if (selectedPane) {
        selectedPane.classList.add('active');
        // Add active class to clicked button
        event.target.classList.add('active');
    }
}

// ========== Quantity Controls ==========
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput) qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput && parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// ========== Search & Sort ==========
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
            displayProducts(filtered);
        });
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            let sorted = [...products];
            
            switch(e.target.value) {
                case 'price-low':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'popular':
                    sorted.sort((a, b) => b.reviews - a.reviews);
                    break;
                case 'newest':
                default:
                    // Keep original order
                    break;
            }
            
            displayProducts(sorted);
        });
    }
});

// ========== Load Cart on Cart Page ==========
if (document.getElementById('cartItems')) {
    updateCartDisplay();
}

// ========== Animations ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
