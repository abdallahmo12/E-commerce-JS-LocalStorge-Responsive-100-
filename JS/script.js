//set up variables
let productsDOM = document.querySelector('.products');
// let cartproductsDom = document.querySelector(".cartproducts");
// let notificationNumber = document.querySelector('.badge');
// let cartmenu = document.querySelector('.cartmenu');
// let notifyDOM = document.querySelector('.notify');

// All products
let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) :productsDB;
// add to favourite icon
let addtofavIcon = document.querySelector(".addToFav");
// remove from favourite icon
let removefromfavIcon = document.querySelector(".removeFromFav");

// Filter Products
let selectionFilter = document.getElementById("filter-by-size");

selectionFilter.addEventListener("change",getProductsFilteredBySize);

// let addedItems;

let DrawUI;
// Display Products in Home DOM
(DrawUI =function(products = []){
    // console.log(localStorage.getItem("products"));
    let prods = products.map((item) => 
    `
    <div class="product-item" >

        <img src="${item.ImagURL}" class="product-image" alt="product imgae" onclick="productdetails(${item.id})" />
        ${item.isMe == "Y" ? "<span class='isMe'> Me </span>" : ""}

        <div class="product-item-desc">
            <h2 class="product-title"> ${item.title} </h2>
            <p class="product-desc">${item.desc}</p>
            <span class="product-size"> ${item.size} </span>
            <div>
            ${item.isMe == "Y" ?"<button type='button' onclick='editProduct("+ item.id +")' class='edit-product'> Edit </button>"
            + "<button type='button' onclick='deleteProduct("+ item.id +")' class='edit-product'> Delete </button>" : ""}
            </div>
        </div>

        <div class="product-item-action">
            <button type="button" onclick="addedItem(${item.id})" class="Add-To-Cart">Add To Cart</button>
            <i class="favourite ${item.isFavourite == true ? "fas" : "far"} fa-heart " style="color : ${item.isFavourite == true && 'red'};" onclick="addToFavourite(${item.id})" ></i>
        </div>

    </div>
    `).join("");
    productsDOM.innerHTML = prods;
})(products);

// Retrive if there is saved Products in cart in localStorage
// (function SavedCartData(){
//     addedItems = localStorage.getItem('productsInCart') ?
//     JSON.parse(localStorage.getItem('productsInCart')):
//     []; 

// if(addedItems){
//     addedItems.map(item =>{
//         cartproductsDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.quantity}</span></p>`;
//         notificationNumber.innerHTML = addedItems.length;
//         showNotify();
//         // notificationNumber.style.display = 'block';
//     })
// }
// })();

// Add Product to CartproductsDoM & added to Array and Save into LocalStorage
let container = [...addedItems];
function addedItem(id){
    if(_username)
    {
        // products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : products;
        let element = products.find(item => item.id == id);
        let item = container.find(el => el.id === element.id);
        console.log(item);

        if(item){
            item.quantity += 1;
        }else{
            container.push(element);
        }

        cartproductsDom.innerHTML = "";
        container.map(item => {
            cartproductsDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.quantity}</span></p>`;
        })

        addedItems = [...addedItems , element];
        let uniqueCartProducts = uniqueProductsSendToCart(addedItems,"id")

        localStorage.setItem("productsInCart",JSON.stringify(uniqueCartProducts));

        let cartproductsLength = document.querySelectorAll('.cartproducts p');
        notificationNumber.innerHTML = cartproductsLength.length;
        
        showNotify();
    }
    else{
        window.location = "login.html";
    }
}
// Appearance of number of notifications on Cart Icon
// function showNotify(){
//     notificationNumber.style.display="block";
// }

// notifyDOM.addEventListener('click',showCartMenu);

// // appeare or disappeare the Cartmenu
// function showCartMenu(){
//     if(cartproductsDom.innerHTML){
//     cartmenu.style.display != "block" ? cartmenu.style.display="block":cartmenu.style.display="none";
//     }
//     else{
//         alert("There is no items in Cart");
//     }
// }

function productdetails(id){
    localStorage.setItem("productId",id);
    setTimeout(() => {
        window.location = "productdetails.html";
    }, 1500)
}

let searchInput = document.getElementById('search');
searchInput.addEventListener("input",function(e){
    // console.log("messi");
    if(e.target.value.trim() === ""){
        DrawUI(JSON.parse(localStorage.getItem('products')));
    }else{
        let products = JSON.parse(localStorage.getItem("products")) || products;
        let arr = searchByName(e.target.value , products);
        DrawUI(arr);
    }
})

function searchByName ( title , myContainer )
{
    let result = myContainer.filter((item) => {return (item.title.toLowerCase()).includes(title.toLowerCase())} )
    return result;
}

function uniqueProductsSendToCart(Arr , type){
    return (Arr.map(item => item[type])
    .map((item,i,final)=> final.indexOf(item) == i && i)
    .filter((item) => Arr[item])
    .map(item => Arr[item]));
}
let addedToFavouriteItems = localStorage.getItem("productsInFavourite") ?
    JSON.parse(localStorage.getItem("productsInFavourite")) : [];

function addToFavourite(id){
    if(_username){
    // products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : products;
    let product = products.find((item) => item.id == id);
    products = products.map(item => {
        if(item.id == product.id){
            item.isFavourite = true;
        }
        return item;
    });
    addedToFavouriteItems = [...addedToFavouriteItems , product];
    localStorage.setItem("products",JSON.stringify(products));
    DrawUI(products);

    let uniqueFavProducts = uniqueProductsSendToCart(addedToFavouriteItems ,"id");
    localStorage.setItem("productsInFavourite" , JSON.stringify(uniqueFavProducts));
    }
    else{
        window.location = "login.html";
    }
}
if(localStorage.getItem("productsInFavourite")){
    let uniqueFavProducts = uniqueProductsSendToCart(addedToFavouriteItems ,"id");
    products.map(item =>{
        uniqueFavProducts.forEach(ele => {
            if(ele.id == item.id ){
                item.isFavourite = true;
            }
        })
        return item;
    })
    localStorage.setItem("products", JSON.stringify(products))
    DrawUI(products);
}
else{
    products.map(item => {
        item.isFavourite = false;
        return item;
    })
    localStorage.setItem("products" , JSON.stringify(products));
}
function getProductsFilteredBySize(e){
    console.log(e.target.value);
    if(e.target.value === "All"){
        let productss = JSON.parse(localStorage.getItem("products")) || products;
        DrawUI(productss);
    }
    else{
        let productss = JSON.parse(localStorage.getItem("products")) || products;
        filteredArr = productss.filter(i => i.size === e.target.value);
        DrawUI(filteredArr);
    }
}

// delete product from products that i added OR created
function deleteProduct(id){
    let allProducts = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : productsDB;
    let productsWithoutDeletedITem = allProducts.filter(item => item.id !== id);
    localStorage.setItem("products", JSON.stringify(productsWithoutDeletedITem));
    DrawUI(localStorage.getItem("products") ? 
    JSON.parse(localStorage.getItem("products")):productsDB);

    
    let productsInCart = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) :[];
    let filteredCart = productsInCart.filter(item => item.id !== id);
    localStorage.setItem("productsInCart" , JSON.stringify(filteredCart));

    cartproductsDom.innerHTML="";
    filteredCart.length?
    filteredCart.map(product =>{
        cartproductsDom.innerHTML += `<p>${product.title} ${product.quantity}</p>`;
        notificationNumber.innerHTML = filteredCart.length;
    }): notificationNumber.style.display="none";
    
    let productsInFavourite = localStorage.getItem("productsInFavourite") ? JSON.parse(localStorage.getItem("productsInFavourite")) :[];
    let filteredFavourites = productsInFavourite.filter(item => item.id !== id);
    console.log(filteredFavourites);
    localStorage.setItem("productsInFavourite" , JSON.stringify(filteredFavourites));
}

// edit product from products that i added OR created
function editProduct(id){
    console.log(id);
    localStorage.setItem("editProductID", id);
    setTimeout(() => {
        window.location = "editproduct.html";
    });
}

let menuDom = document.querySelector("#user_info");
let menuBtn = document.querySelector(".menu");
if(window.innerWidth <= "567" ){
    menuDom.style.display = "none";
}
else{
    menuDom.style.display = "flex";
}
menuBtn.addEventListener("click",showMenu);
function showMenu(){
    menuDom.style.display == "none" ? menuDom.style.display = "flex": menuDom.style.display = "none";
}

if(localStorage.getItem("username") == null)
{
    links.style.display = "flex";
    userDom.style.display = "none";
}
