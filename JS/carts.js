let productsInCarts = localStorage.getItem('productsInCart');
// let cartproductsDom = document.querySelector(".cartproducts");
// let notificationNumber = document.querySelector('.badge');
// let cartmenu = document.querySelector('.cartmenu');
// let notifyDOM = document.querySelector('.notify');

let productsDOM = document.querySelector('.products');

let products;

// console.log(productsInCarts);

if(productsInCarts)
{
    products = JSON.parse(productsInCarts);
    console.log(products);
    drawProductsInCart(products);
}
function drawProductsInCart(products_In_Cart = []){
    let products = JSON.parse(localStorage.getItem("productsInCart")) || products_In_Cart;
    if(products.length == 0){
        productsDOM.innerHTML = `<div class="noProducts">There are no Products in your cart</div> `;
    }else{ 
    let productsInCartUI =products.map((product) =>{
        return `
    <div class="product-item">

        <img src="${product.ImagURL}" class="product-image" alt="product imgae" />

        <div class="product-item-desc">
            <h2 class="product-title"> ${product.title} </h2>
            <p class="product-desc">${product.desc}</p>
            <span class="product-size"> ${product.size} </span> <br>
            <span class="product-size"> Quantity : ${product.quantity} </span>
        </div>

        <div class="product-item-action">
            <button type="button" onclick="deleteItem(${product.id})" class="Add-To-Cart">Delete Item</button>
            </div>
    </div>
    `}).join('');
    productsDOM.innerHTML = productsInCartUI;}
}
drawProductsInCart();

function deleteItem(id){
    let products = localStorage.getItem("productsInCart");
    let productsData = JSON.parse(products);
    if(products)
    {
        let fillteredProducts = productsData.filter((element) => element.id != id);
        localStorage.setItem("productsInCart" , JSON.stringify(fillteredProducts));
        drawProductsInCart(fillteredProducts);

        // SavedCartData();
        
        cartproductsDom.innerHTML = fillteredProducts.map((item)=>{
            return `<p> ${item.title}  <span class='item-qty'>${item.quantity}</span></p>`
        }).join('');
        notificationNumber.innerHTML = fillteredProducts.length;
    }
}
