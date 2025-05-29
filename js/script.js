let mybutton = document.getElementById("toTopBtn");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
(async () => {
  console.log("Current category - ", getCurrentCategory());
  if (getCurrentCategory() === null || getCurrentCategory() === undefined) {
    setCurrentCategory("all");
  }
  const products = await getProducts();
  const filteredProducts = filterProducts(getCurrentCategory(), products);
  showProducts(filteredProducts);
  document.querySelectorAll(".categoryNav__item").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      setCurrentCategory(e.currentTarget.innerText.toLowerCase());
      const filteredProducts = filterProducts(getCurrentCategory(), products);
      showProducts(filteredProducts);
      if (window.location.pathname !== "/pages/categories.html") {
        window.location.href = "/pages/categories.html";
      }
    });
  });
})();

async function showProducts(products) {
  const productCards = document.getElementById("productCards");
  if (!productCards) {
    return;
  }
  productCards.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "productCard";
    card.innerHTML = `
        <div class="productCard__code">Code: <span>${product.productCode}</span></div>
        <img src="${product.imgUrl}" alt="${product.name}" class="productCard__img">
        <div class="productCard__title"><span>${product.name}</span></div>
        <div class="productCard__price"><span>${product.price}</span></div>
        <button class="productCard__btn" onClick="buyProduct()">Buy</button>
        `;
    productCards.appendChild(card);
  });
}
async function getProducts() {
  const response = await fetch("/data/data.json");
  const data = await response.json();
  return data;
}
function filterProducts(category, products) {
  const snakedCategory = category.replace(/\s+/g, "_").toLowerCase();
  return products.filter((product) => {
    if (snakedCategory === "all") {
      return products;
    } else {
      return product.category === snakedCategory;
    }
  });
}

function setCurrentCategory(category = "all") {
  localStorage.setItem("category", category);
}

function getCurrentCategory() {
  return localStorage.getItem("category");
}

function buyProduct() {
  Swal.fire({
    title: "Buy!",
    icon: "success",
    confirmButtonText: "OK",
    html: `<b>Contact us to place an order: </b>
    <a style="color:#f86f1c" href="mailto:ballszone7@gmail.com" autofocus>ballszone7@gmail.com</a> <br> <br>
    Send us the product code<br><br>
    <b>Or call us at: </b><a style="color:#f86f1c" href="tel:+380937597572">+380 93 759 75 72</a>`,
  });
}
