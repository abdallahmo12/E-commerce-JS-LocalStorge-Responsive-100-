let cartproductsDom = document.querySelector(".cartproducts");
let notificationNumber = document.querySelector('.badge');
let cartmenu = document.querySelector('.cartmenu');
let notifyDOM = document.querySelector('.notify');


let addedItems;

(function SavedCartData(){
    addedItems = localStorage.getItem('productsInCart') ?
    JSON.parse(localStorage.getItem('productsInCart')):
    []; 

if(addedItems){
    addedItems.map(item =>{
        cartproductsDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.quantity}</span></p>`;
        notificationNumber.innerHTML = addedItems.length;
        showNotify();
        // notificationNumber.style.display = 'block';
    })
}
})();
function showNotify(){
    notificationNumber.style.display="block";
}

notifyDOM.addEventListener('click',showCartMenu);

// appeare or disappeare the Cartmenu
function showCartMenu(){
    if(cartproductsDom.innerHTML){
    cartmenu.style.display != "block" ? cartmenu.style.display="block":cartmenu.style.display="none";
    }
    else{
        alert("There is no items in Cart");
    }
}