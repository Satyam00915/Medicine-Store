# MediCare - Online Medicine Ecommerce Website

A modern, clean, and user-friendly ecommerce website for selling medicines online. Built with HTML, CSS, and JavaScript.

## 📋 Features

### Pages Included:
1. **Homepage (index.html)**
   - Hero section with call-to-action
   - Features/benefits showcase
   - Product categories grid
   - Featured products carousel
   - Newsletter subscription
   - Professional footer

2. **Products Page (products.html)**
   - Product listing with grid layout
   - Advanced filtering (category, price range, rating)
   - Search functionality
   - Sort by price, popularity, newest
   - Pagination support
   - Responsive design

3. **Product Details Page (product-detail.html)**
   - Large product image with thumbnails
   - Detailed product information
   - Price and discount display
   - Quantity selector
   - Add to cart/wishlist buttons
   - Product specifications
   - Tabs for description, usage, and reviews
   - Related products section

4. **Shopping Cart (cart.html)**
   - View all cart items
   - Adjust quantities
   - Remove items
   - Order summary
   - Promo code input
   - Safe checkout information
   - Empty cart state

## 🎨 Design Features

- **Modern Color Scheme**: Professional teal and blue gradient with accent colors
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Clean UI**: Minimalist design with proper spacing and typography
- **User-Friendly**: Intuitive navigation and clear call-to-action buttons
- **Smooth Animations**: Hover effects and transitions for better UX
- **Accessibility**: Semantic HTML and proper color contrast

## 🛠️ How to Use

### Opening the Website
1. Open `index.html` in your web browser
2. Navigate through the different pages using the navigation menu
3. Explore products and add them to your cart

### Key Features:

**Shopping:**
- Click "Shop Now" to browse products
- Use filters on the products page to narrow down results
- Search for specific medicines
- Click on a product to view details
- Add items to cart with quantity control

**Cart Management:**
- View cart anytime from the navigation bar
- Change item quantities or remove items
- See order summary with shipping and tax
- Apply promo codes (demo feature)

**Navigation:**
- Top navigation bar with menu links
- Mobile-friendly hamburger menu
- Footer with quick links and contact info

## 📦 Product Data

The website includes 8 sample medicines across 6 categories:
- **Pain Relief**: Aspirin, Ibuprofen
- **Vitamins**: Vitamin C, Multivitamin Complex
- **Cold & Flu**: Cough Syrup
- **Digestion**: Digestive Enzymes
- **Skin Care**: Anti-Fungal Cream
- **First Aid**: First Aid Kit

Products include:
- Name and pricing (with discounts)
- Ratings and reviews
- Category tags
- Manufacturer information
- Detailed descriptions

## 💾 Local Storage

The website uses browser local storage to:
- Save shopping cart items
- Persist cart across page refreshes
- Maintain cart count in navigation

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (full features)
- **Tablet**: 768px - 1199px (optimized layout)
- **Mobile**: Below 768px (mobile-first design)

## 🚀 Customization

You can easily customize:

### Colors
Edit the CSS variables in `styles.css`:
```css
--primary-color: #0f7d9d;
--secondary-color: #2196f3;
--accent-color: #ff6b6b;
```

### Products
Add/edit products in `script.js` in the `products` array:
```javascript
{
    id: X,
    name: 'Medicine Name',
    category: 'category-name',
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 256,
    icon: '💊',
    manufacturer: 'Company',
    description: 'Description'
}
```

### Branding
- Change "MediCare" logo text in HTML files
- Update company name in footer
- Modify contact information
- Update social media links

## ⚡ Performance

- Lightweight and fast loading
- No external dependencies (except fonts)
- Optimized images (emoji icons)
- CSS animations for smooth transitions
- Efficient JavaScript code

## 🔒 Security Notes

This is a frontend-only ecommerce template. For a production site, you would need:
- Server-side backend
- Payment gateway integration
- User authentication
- Database for products and orders
- SSL/HTTPS encryption

## 📞 Support

For modifications or questions:
- Contact: support@medicare.com
- Phone: 1-800-MEDICARE
- Hours: 24/7 Support Available

## 📄 License

This template is free to use and modify for personal or commercial projects.

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Built with**: HTML5, CSS3, Vanilla JavaScript
