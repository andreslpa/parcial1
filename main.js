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
        console.log(body)
        let categories = body;
        selectedCategory = categories[0].name;
        for(const key in categories){
            let category = categories[key];
            let li = document.createElement("li");
            li.textContent = category.name;
            li.addEventListener()
            categoriesList.appendChild(li);
        }

    });
}

function changeCategory(){
    fetch(urlCategoriesDetail)
    .then(res => res.json())
    .then(body => {
        console.log(body)
        let categories = body;
        let categoryDetail = categories.filter((item) => item.name = selectedCategory);
        console.log(categoryDetail);
    });
}

function addItem(){
    nItemsVal++;
    nItems.textContent = nItemsVal;
}

inicialize();




