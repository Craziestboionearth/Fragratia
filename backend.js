const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

let products = JSON.parse(localStorage.getItem("products")) || [];

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
        <button onclick="editProduct(${index})">Bearbeiten</button>
        <button onclick="deleteProduct(${index})">Löschen</button>
      </div>
    `;
  });
}

function editProduct(index) {
  const product = products[index];
  productForm.name.value = product.name;
  productForm.image.value = product.image;
  productForm.description.value = product.description;
  productForm.price.value = product.price;
  productForm.tags.value = product.tags.join(", ");
  productForm.index.value = index;
}

function deleteProduct(index) {
  if (confirm("Produkt wirklich löschen?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    productForm.reset();
    productForm.index.value = "";
  }
}

productForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(productForm);
  const newProduct = {
    name: formData.get("name"),
    image: formData.get("image"),
    description: formData.get("description"),
    price: formData.get("price"),
    tags: formData
      .get("tags")
      .split(",")
      .map((tag) => tag.trim().toLowerCase()),
  };

  const index = formData.get("index");
  if (index === "") {
    products.push(newProduct);
  } else {
    products[index] = newProduct;
  }

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  productForm.reset();
  productForm.index.value = "";
});

renderProducts();
