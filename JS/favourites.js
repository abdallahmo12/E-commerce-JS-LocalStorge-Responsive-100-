// let cartproductsDom = document.querySelector(".cartproducts");
// let notificationNumber = document.querySelector('.badge');
// let cartmenu = document.querySelector('.cartmenu');
// let notifyDOM = document.querySelector('.notify');

let productsDOM = document.querySelector('.products');

let products;

function drawProductsInCart(products_In_Cart = []){
    let products = JSON.parse(localStorage.getItem("productsInFavourite")) || products_In_Cart;
    if(products.length == 0){
        productsDOM.innerHTML = `<div class="noProducts">There are no Products in your favourites</div> `;
    }else{ 
    let productsInFavouriteUI =products.map((product) =>{
        return `
    <div class="product-item">

        <img src="${product.ImagURL}" class="product-image" alt="product imgae" />

        <div class="product-item-desc">
            <h2 class="product-title"> ${product.title} </h2>
            <p class="product-desc">${product.desc}</p>
            <span class="product-size"> ${product.size} </span>
        </div>

        <div class="product-item-action">
            <button type="button" onclick="deleteItem(${product.id})" class="Add-To-Cart">Delete Item</button>
            </div>
    </div>
    `}).join("");
    productsDOM.innerHTML = productsInFavouriteUI;}
}
drawProductsInCart();

function deleteItem(id){
    let products = JSON.parse(localStorage.getItem("products"));
    let favProducts = localStorage.getItem("productsInFavourite");
    let favProductsData = JSON.parse(favProducts);
    if(favProducts)
    {
        let fillteredProducts = favProductsData.filter((element) => element.id != id);
        newProducts = products.map(item => {
            if(item.id == id){
                item.isFavourite = false;
            }
            return item;
        });
        localStorage.setItem("products", JSON.stringify(newProducts));
        localStorage.setItem("productsInFavourite" , JSON.stringify(fillteredProducts));
        drawProductsInCart(fillteredProducts);
    }
}