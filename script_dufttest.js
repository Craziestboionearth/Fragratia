// URL deiner Google Sheets JSON-API
const apiUrl =
  "https://script.google.com/macros/s/AKfycbxqqcvnPgUKYJZdQfhjj_zRfYj4Wl0NG-A9dS2K-xbsyqe8SUZ3wOP06Vy-UTSGpQBe/exec";

// Funktion zum Laden und Anzeigen der Produkte
function ladeProdukte() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((produkte) => {
      const container = document.getElementById("produktliste");
      container.innerHTML = ""; // Vorherige Inhalte löschen

      produkte.forEach((p) => {
        const produktDiv = document.createElement("div");
        produktDiv.className = "produkt";

        produktDiv.innerHTML = `
          <h3>${p.Name}</h3>
          <p><strong>Preis:</strong> €${parseFloat(p.Preis).toFixed(2)}</p>
          <p><strong>Kategorie:</strong> ${p.Kategorie}</p>
        `;

        container.appendChild(produktDiv);
      });
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Produkte:", err);
      const container = document.getElementById("produktliste");
      container.innerHTML = "<p>Fehler beim Laden der Produkte.</p>";
    });
}

// Starte das Laden, sobald die Seite fertig ist
document.addEventListener("DOMContentLoaded", ladeProdukte);
