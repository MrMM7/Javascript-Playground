# 🛒 Dynamic Shopping Project

This is a **JavaScript-powered** dynamic shopping project that generates product pages based on query parameters. It allows users to view product details dynamically without needing multiple hardcoded HTML files.

## 🚀 Features
- Dynamically generated product pages using `location.search`
- No hardcoded product pages, everything updates based on the product ID
- Simple and lightweight JavaScript logic for seamless navigation

## 📂 How to Add a New Product  
To add a new product to the store:

1. **Add an image** of the product in the `images/` folder.
2. **Modify the `allProducts` array** inside `app.js` and `product.js` by adding a new object with the following structure:

   ```js
   { 
     id: X, 
     src: "images/YOUR_IMAGE.png", 
     name: "Product Name", 
     price: PRICE, 
     desc: "A brief description of the product"
   }
   ```
   - **`id`** → The next available ID (increments by 1 from the last product)
   - **`src`** → Path to the image inside `images/`
   - **`name`** → The actual product name
   - **`price`** → Product price as a number with no $ sign
   - **`desc`** → A brief description of the product (e.g., "A high-quality product")
     
3. **Save & Reload** – Your new product will now automatically be available in the shopping project!

Feel free to contribute or modify the project! 🚀
