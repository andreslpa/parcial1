const urlCategoriesDetail =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const nItems = document.getElementById("nItems");
const categoriesList = document.getElementById("categoriesList");
const title = document.getElementById("title");
const categoryProducts = document.getElementById("categoryProducts");
const shoppingCarDetail = document.getElementById("shoppingCarDetail");
const orderDetail = document.getElementById("orderDetail");
const totalAmount = document.getElementById("totalAmount");

let nItemsVal = 0;
let shoppingCar = [];

function inicialize() {
  fetch(urlCategoriesDetail)
    .then((res) => res.json())
    .then((body) => {
      let categories = body;
      for (const key in categories) {
        let category = categories[key];
        let a = document.createElement("a");
        a.textContent = category.name;
        a.className = "nav-link text-light";
        a.href = "#categoriesList";
        a.addEventListener("click", changeCategory.bind(this, category.name));
        categoriesList.appendChild(a);
      }
      changeCategory("Burguers");
    });
  document.getElementById("shoppingCar").addEventListener("click", reviewCar);
  document
    .getElementById("confirmOrder")
    .addEventListener("click", confirmOrder);
  document.getElementById("cancelOrder").addEventListener("click", cancelOrder);
}

function changeCategory(category) {
  title.textContent = category;
  shoppingCarDetail.className = "d-none";
  fetch(urlCategoriesDetail)
    .then((res) => res.json())
    .then((body) => {
      let categories = body;
      let categoryDetail = categories.find((item) => item.name == category);
      let products = categoryDetail.products;

      categoryProducts.innerHTML = "";
      for (let key in products) {
        let product = products[key];

        let col = document.createElement("div");
        col.className = "col-3 my-3";

        let card = document.createElement("div");
        card.className = "card h-100";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";

        let buyDiv = document.createElement("div");
        buyDiv.className = "mt-auto";

        let name = document.createElement("h3");
        name.textContent = product.name;

        let img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.height = 250;

        let description = document.createElement("p");
        description.textContent = product.description;

        let price = document.createElement("p");
        price.className = "mt-auto fw-bold";
        price.textContent = `$${product.price}`;

        let button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-dark";
        button.textContent = "Add to car";
        button.addEventListener("click", addItem.bind(this, product));

        buyDiv.appendChild(price);
        buyDiv.appendChild(button);

        cardBody.appendChild(name);
        cardBody.appendChild(description);
        cardBody.appendChild(buyDiv);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        categoryProducts.appendChild(col);
      }
    });
}

function addItem(product) {
  let orderProduct = shoppingCar.find(
    (item) => item.description == product.name
  );
  if (orderProduct == undefined) {
    let order = {
      quantity: 1,
      description: product.name,
      unitPrice: parseFloat(product.price),
    };
    shoppingCar.push(order);
  } else {
    orderProduct.quantity++;
  }
  nItemsVal++;
  nItems.textContent = nItemsVal;
}

function decreaseItem(product) {
  let orderProduct = shoppingCar.find(
    (item) => item.description == product.name
  );
  orderProduct.quantity--;
  if (orderProduct.quantity == 0) {
    const index = shoppingCar.indexOf(orderProduct);
    if (index > -1) {
      shoppingCar.splice(index, 1);
    }
  }
  nItemsVal--;
  nItems.textContent = nItemsVal;
}

function reviewCar() {
  categoryProducts.innerHTML = "";
  title.textContent = "Order detail";
  shoppingCarDetail.className = "container";
  orderDetail.innerHTML = "";
  let i = 1;
  let totalAmountN = 0;
  for (let key in shoppingCar) {
    let orderProduct = shoppingCar[key];

    let tr = document.createElement("tr");

    let th = document.createElement("th");
    th.scope = "row";
    th.textContent = i;

    let quantity = document.createElement("td");
    quantity.textContent = orderProduct.quantity;

    let description = document.createElement("td");
    description.textContent = orderProduct.description;

    let unitPrice = document.createElement("td");
    unitPrice.textContent = orderProduct.unitPrice;

    let amount = document.createElement("td");
    let amountProduct = orderProduct.unitPrice * orderProduct.quantity;
    amount.textContent = amountProduct.toFixed(2);
    totalAmountN += amountProduct;

    let modify = document.createElement("td");
    let increase = document.createElement("button");
    increase.type = "button";
    increase.className = "btn btn-secondary me-1";
    increase.textContent = "+";
    increase.addEventListener(
      "click",
      addItem.bind(this, { name: orderProduct.description })
    );
    increase.addEventListener("click", reviewCar);
    let decrease = document.createElement("button");
    decrease.type = "button";
    decrease.className = "btn btn-secondary";
    decrease.textContent = "-";
    decrease.addEventListener(
      "click",
      decreaseItem.bind(this, { name: orderProduct.description })
    );
    decrease.addEventListener("click", reviewCar);
    modify.appendChild(increase);
    modify.appendChild(decrease);

    tr.appendChild(th);
    tr.appendChild(quantity);
    tr.appendChild(description);
    tr.appendChild(unitPrice);
    tr.appendChild(amount);
    tr.appendChild(modify);

    orderDetail.appendChild(tr);

    i++;
  }
  totalAmount.textContent = `Total: $${totalAmountN.toFixed(2)}`;
}

function cancelOrder() {
  shoppingCar = [];
  nItemsVal = 0;
  nItems.textContent = nItemsVal;
  changeCategory("Burguers");
}

function confirmOrder() {
  let order = [];
  let i = 1;
  for (let key in shoppingCar) {
    let orderProduct = shoppingCar[key];
    let orderConsole = {
      item: i,
      quantity: orderProduct.quantity,
      description: orderProduct.description,
      unitPrice: orderProduct.unitPrice,
    };
    order.push(orderConsole);
    i++;
  }
  console.log(order);
  cancelOrder();
}

inicialize();
