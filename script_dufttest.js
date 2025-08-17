const tagMap = {
  gender: {
    herren: "herren",
    damen: "damen",
    unisex: "unisex",
  },
  environment: {
    wald: "frisch,fruchtig",
    spa: "elegant",
    strand: "sauber",
    wohnzimmer: "dezent",
  },
  price: {
    unter100: "unter100",
    ueber100: "ueber100",
    beliebig: null,
  },
};

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const genderTag = tagMap.gender[formData.get("gender")];
  const environmentTags =
    tagMap.environment[formData.get("environment")].split(",");
  const priceTag = tagMap.price[formData.get("price")];

  const selectedTags = [genderTag, ...environmentTags];

  fetch("api.php")
    .then((res) => res.json())
    .then((products) => {
      const matchingProducts = products.filter((product) => {
        const matchCount = selectedTags.filter((tag) =>
          product.tags.includes(tag),
        ).length;

        const priceMatches =
          priceTag === null || product.tags.includes(priceTag);

        return matchCount >= 2 && priceMatches;
      });

      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML =
        "<h2 style='text-align: center;'>Dein perfekter Duft:</h2>";

      if (matchingProducts.length === 0) {
        resultsDiv.innerHTML +=
          "<p style='text-align: center;'>Wir konnten leider keinen passenden Duft finden.</p>";
      } else {
        matchingProducts.forEach((product) => {
          resultsDiv.innerHTML += `
            <div class="product">
              <h3>${product.name}</h3>
              <img src="${product.image}" alt="${product.name}">
              <p>${product.description}</p>
              <strong>Preis: ${product.price}</strong>
            </div>
          `;
        });
      }
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Produkte:", err);
      document.getElementById("results").innerHTML =
        "<p style='text-align: center;'>Fehler beim Laden der Produkte.</p>";
    });
});
