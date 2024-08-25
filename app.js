import { ScrollHeader } from "./headerScroll.js";
import { toggleActive } from "./toggle.js";
import { logIn } from "./logIn.js";
import { fetchProducts } from "./fetchProducts.js";

const productsContainer = document.getElementById("products");
const search = document.getElementById("search");
const moreProductBtn = document.getElementById("moreProductBtn");
const mostPopular = document.getElementById("mostPopular");
const popularSection = document.getElementById("popularSection");

let allProducts = [];
let perPage = 9;
let perPageTab = 3;
let indexPopular = 3;
let currentIndex;
let productBtn = 1;
let prev, next, pageNum;
let readMore, readMorePopular;

ScrollHeader();
logIn();
document.getElementById("toggleBtn").addEventListener("click", toggleActive);

// Show Products Function
function displayProducts(products, parent) {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `<img src="${product.image}" alt="${
      product.title
    }"> <div class="card-content">
    <h2>${product.title}</h2>
    <p>${product.description.substring(0, 150)}...</p>
    <div class="price">
    <div>${product.price}$</div>
    <div class="old">${product.oldPrice}$</div>
    </div>
    </div>
    `;
    parent.appendChild(productCard);
  });
}

async function add() {
  allProducts = await fetchProducts();
  setUpPage();
  if (window.innerWidth < 768) {
    readMoreProducts();
    mostPopularProducts();
  } else {
    moreProducts(1);
  }
}

//Create products buttons
function setUpPage() {
  const moreProductBtnNum = document.createElement("div");
  moreProductBtnNum.className = "morePoductBtnNum";
  moreProductBtn.append(moreProductBtnNum);

  prev = document.createElement("button");
  prev.innerHTML = "Prev";
  moreProductBtnNum.appendChild(prev);

  pageNum = Math.ceil(allProducts.length / perPage);

  for (let i = 0; i < pageNum; i++) {
    const page = document.createElement("button");
    page.innerHTML = `${productBtn}`;
    moreProductBtnNum.appendChild(page);

    page.addEventListener("click", () => {
      moreProducts(i + 1);
      scrollToSection();
    });
    page.addEventListener("click", () => pageActive(page));

    productBtn += 1;
  }

  next = document.createElement("button");
  next.innerHTML = "Next";
  moreProductBtnNum.appendChild(next);

  setFirstActive();
}

function moreProducts(pageIndex) {
  productsContainer.innerHTML = "";
  const nextProduct = allProducts.slice(
    (pageIndex - 1) * perPage,
    perPage * pageIndex
  );
  displayProducts(nextProduct, productsContainer);
}

function setFirstActive() {
  const thirdChild = moreProductBtn.children[2];
  const secondChildOfThird = thirdChild.children[1];
  pageActive(secondChildOfThird);
}

function pageActive(page) {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("activeBtn");
  });
  page.classList.add("activeBtn");

  if (page.innerHTML === "1") {
    prev.classList.add("notActive");
  } else {
    prev.classList.remove("notActive");
  }

  if (page.innerHTML === `${pageNum}`) {
    next.classList.add("notActive");
  } else {
    next.classList.remove("notActive");
  }

  if (!prev.classList.contains("notActive")) {
    prev.addEventListener("click", () => {
      pageActive(page.previousSibling);
      const activePageNumP = page.previousSibling.textContent;
      moreProducts(activePageNumP);
      scrollToSection();
    });
  }

  if (!next.classList.contains("notActive")) {
    next.addEventListener("click", () => {
      pageActive(page.nextSibling);
      const activePageNumN = page.nextSibling.textContent;
      moreProducts(activePageNumN);
      scrollToSection();
    });
  }
}

function scrollToSection() {
  moreProductBtn.scrollIntoView({ behavior: "smooth" });
}

//Tablet size Products

function readMoreProducts() {
  if (!moreProductBtn.querySelector("span")) {
    readMore = document.createElement("span");
    readMore.innerHTML = "Read more";
    readMore.className = "readMore";
    moreProductBtn.appendChild(readMore);

    readMore.addEventListener("click", () => {
      const readMoreProduct = allProducts.slice(
        currentIndex,
        currentIndex + perPageTab
      );
      displayProducts(readMoreProduct, productsContainer);
      currentIndex += perPageTab;

      if (currentIndex >= allProducts.length) {
        readMore.style.display = "none";
      } else {
        readMore.style.display = "block";
      }
    });
  }

  productsContainer.innerHTML = "";
  displayProducts(allProducts.slice(0, perPageTab), productsContainer);
  currentIndex = 3;
  readMore.style.display = "block";
}

// Filter Products
function filterProducts() {
  const searchItem = search.value.toLowerCase().trim();
  const filterProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchItem)
  );
  if (search.value === "") {
    readMoreProducts();
    mostPopularProducts();
  } else {
    productsContainer.innerHTML = "";
    displayProducts(filterProducts, productsContainer);
    readMore.style.display = "none";
    mostPopularProducts();
  }
}

search.addEventListener("input", filterProducts);

//Most Popular Section
function mostPopularProducts() {
  const popullarProducts = allProducts.filter((product) => product.price < 300);
  displayProducts(popullarProducts, mostPopular);

  if (!popularSection.querySelector("span")) {
    readMorePopular = document.createElement("span");
    readMorePopular.innerHTML = "Read more ";
    readMorePopular.className = "readMorePopular";
    popularSection.appendChild(readMorePopular);

    readMorePopular.addEventListener("click", () => {
      const showPopular = popullarProducts.slice(
        indexPopular,
        indexPopular + perPageTab
      );
      displayProducts(showPopular, mostPopular);
      indexPopular += perPageTab;

      if (indexPopular >= popullarProducts.length) {
        readMorePopular.style.display = "none";
      } else {
        readMorePopular.style.display = "block";
      }
    });
  }
  mostPopular.innerHTML = "";
  displayProducts(popullarProducts.slice(0, perPageTab), mostPopular);
  indexPopular = 3;
  readMorePopular.style.display = "block";
}

const mediaQuery = window.matchMedia("(max-width: 768px)");
mediaQuery.addEventListener("change", () => {
  if (mediaQuery.matches) {
    readMoreProducts();
    mostPopularProducts();
  } else {
    moreProducts(1);
    setFirstActive();
    readMore.style.display = "none";
    readMorePopular.style.display = "none";
  }
});

add();
