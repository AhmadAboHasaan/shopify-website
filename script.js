class Prodact {
  constructor(name, category, price, image) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.image = image;
  }
}

/*

  todo add hover effrct to prodacts images whit "clik for details" text & blur the fore the image 
  for the tilte add the prodact page link 
  for the prodact category add hover event that show the same other procats withen its category

  todo add cart icon to the header withen hover event pop the added prodacts and its prices & total cost 

*/

const products = [
  new Prodact("Laptop", "Electronics", 999, "images/laptop.png"),
  new Prodact("Headphones", "Electronics", 199, "images/headphones.png"),
  new Prodact("Coffee Maker", "Home Appliances", 49, "images/coffeemaker.png"),
  new Prodact("Blender", "Home Appliances", 29, "images/blender.png"),
  new Prodact("Jeans", "Clothing", 22, "images/jeans.png"),
  new Prodact("T-Shirt", "Clothing", 19, "images/tshirt.png"),
  new Prodact("Smartphone", "Electronics", 799, "images/smartphone.png"),
  new Prodact("Tablet", "Electronics", 499, "images/tablet.png"),
  new Prodact("Air Conditioner","Home Appliances",299,"images/airconditioner.png"),
  new Prodact("Microwave Oven", "Home Appliances", 89, "images/microwave.png"),
  new Prodact("Dress", "Clothing", 79, "images/dress.png"),
  new Prodact("Sneakers", "Footwear", 120, "images/sneakers.png"),
  new Prodact("Sandals", "Footwear", 45, "images/sandals.png"),
  new Prodact("Wrist Watch", "Accessories", 150, "images/watch.png"),
  new Prodact("Backpack", "Accessories", 60, "images/backpack.png"),
  new Prodact("Novel Book", "Books", 15, "images/book.png"),
  new Prodact("Cookbook", "Books", 25, "images/book.png"),
  new Prodact("Board Game", "Toys & Games", 35, "images/boardgame.png"),
  new Prodact("PlayStation", "Electronics", 400, "images/playstation.png"),
  new Prodact("TV", "Electronics", 350, "images/tv.png"),
];

let currentProducts = products.slice();

function displayProducts(productsToDisplay) {
  const productDisplay = document.getElementById("product-display");
  productDisplay.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const imageSrc = product.image || "images/default.png";

    productItem.innerHTML = `
          <a href="http://" target="_blank" rel="noopener noreferrer"><img src="${imageSrc}" alt="${product.name}" loading="lazy"></a>
          <div class="hover-overlay">Click for details</div>
          <a href="http://" target="_blank" rel="noopener noreferrer"><h3>${product.name}</h3></a>
          <p>Category: ${product.category}</p>
          <p>Price: $${product.price}</p>
      `;

    productDisplay.appendChild(productItem);
  });
}

function createFilterButtons() {
  const filterSection = document.getElementById("filter-section");
  filterSection.innerHTML = "";

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("filter-button");
    button.textContent = category;

    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      if (category === "All") {
        currentProducts = products.slice();
      } else {
        currentProducts = products.filter(
          (product) => product.category === category
        );
      }
      applyFilters();
      closeSidebar();
    });

    filterSection.appendChild(button);
  });
}

function createSortOptions() {
  const sortSection = document.getElementById("sort-section");

  const select = document.createElement("select");
  select.id = "sort";

  const options = [
    { value: "", text: "Sort By: None" },
    { value: "name-asc", text: "Name (A-Z)" },
    { value: "name-desc", text: "Name (Z-A)" },
    { value: "price-asc", text: "Price (Low to High)" },
    { value: "price-desc", text: "Price (High to Low)" },
  ];

  options.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    select.appendChild(option);
  });

  select.addEventListener("change", applyFilters);

  sortSection.appendChild(select);
}

function createSearchBar() {
  const searchSection = document.getElementById("search-section");

  const input = document.createElement("input");
  input.type = "text";
  input.id = "search-input";
  input.placeholder = "Search products...";

  input.addEventListener("input", applyFilters);

  searchSection.appendChild(input);
}

function sortProducts(productsToSort) {
  const criteria = document.getElementById("sort").value;
  const sortedProducts = productsToSort.slice();
  if (criteria === "name-asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (criteria === "name-desc") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (criteria === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (criteria === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
}

function applyFilters() {
  let filteredProducts = currentProducts.slice();

  const query = document.getElementById("search-input").value.toLowerCase();
  if (query) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  filteredProducts = sortProducts(filteredProducts);

  displayProducts(filteredProducts);
}

function closeSidebar() {
  const nav = document.querySelector("nav");
  const overlay = document.getElementById("overlay");
  nav.classList.remove("active");
  overlay.classList.remove("active");
}

function init() {
  createFilterButtons();
  createSortOptions();
  createSearchBar();

  const allFilterButton = document.querySelector(".filter-button");
  if (allFilterButton) {
    allFilterButton.classList.add("active");
  }

  displayProducts(products);
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");
  const overlay = document.getElementById("overlay");

  menuToggle.addEventListener("click", (event) => {
    nav.classList.toggle("active");
    overlay.classList.toggle("active");
    event.stopPropagation();
  });

  overlay.addEventListener("click", () => {
    closeSidebar();
  });

  document.addEventListener("click", (event) => {
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnMenuToggle) {
      closeSidebar();
    }
  });

  nav.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  init();
});
