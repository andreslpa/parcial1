const urlCategoriesDetail = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const nItems = document.getElementById("nItems")
const categoriesList = document.getElementById("categoriesList");
const currentCategory = document.getElementById("currentCategory");
const categoryProducts = document.getElementById("categoryProducts");

let nItemsVal = 0;
let selectedCategory = "";

function inicialize(){
    fetch(urlCategoriesDetail)
    .then(res => res.json())
    .then(body => {
        let categories = body;
        selectedCategory = categories[0].name;
        currentCategory.textContent = selectedCategory;
        for(const key in categories){
            let category = categories[key];
            let li = document.createElement("li");
            li.textContent = category.name;
            li.onclick = changeCategory.bind(this, [category.name]);
            categoriesList.appendChild(li);
        }
        changeCategory("Burguers");

    });
}

function changeCategory(category){
    currentCategory.textContent = category;
    fetch(urlCategoriesDetail)
    .then(res => res.json())
    .then(body => {
        let categories = body;
        let categoryDetail = categories.find(item => item.name == category)
        let products = categoryDetail.products;
    
        categoryProducts.innerHTML = "";
        for(let key in products){
            let product = products[key];
            let li = document.createElement("li");
            let name = document.createElement("p");
            name.textContent = product.name;
            let img = document.createElement("img");
            img.src = product.image;
            let description = document.createElement("p");
            description.textContent = product.description;
            let button = document.createElement("button")
            button.textContent ="Add item";
            button.onclick = addItem;
            li.appendChild(name);
            li.appendChild(img);
            li.appendChild(description);
            li.appendChild(button);

            categoryProducts.appendChild(li);

        }
    });
}

function addItem(){
    nItemsVal++;
    nItems.textContent = nItemsVal;
}

inicialize();




