window.addEventListener("load", function () {
  var grid = document.querySelector(".grid");
  var msnry = new Masonry(grid, {
    itemSelector: ".grid-item",
    columnWidth: 260,
    gutter: 20,
    fitWidth: true,
  });

  var gridItems = document.querySelectorAll(".grid-item");

  gridItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      setTimeout(function () {
        var rect = item.getBoundingClientRect();
        var viewportWidth =
          window.innerWidth || document.documentElement.clientWidth;
        var viewportHeight =
          window.innerHeight || document.documentElement.clientHeight;

        // Horizontaler Overflow prüfen
        var rightOverflow = rect.right > viewportWidth;
        if (rightOverflow) {
          window.scrollBy({
            left: rect.right - viewportWidth + 20,
            behavior: "smooth",
          });
        }

        // Vertikalen Overflow prüfen (unten abgeschnitten?)
        var bottomOverflow = rect.bottom > viewportHeight;

        // Wenn unten abgeschnitten, immer nach unten scrollen
        if (bottomOverflow) {
          item.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 300);
    });
  });
});
