const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

let products = [];

function renderProducts() {
  productList.innerHTML = "<h2>Gespeicherte Produkte:</h2>";
  products.forEach((product, index) => {
    productList.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <strong>Preis: ${product.price}</strong><br>
        <em>Tags: ${product.tags.join(", ")}</em><br><br>
        <button onclick
