let productId = localStorage.getItem("productId");
console.log(typeof productId);
let products = JSON.parse(localStorage.getItem("products"));
console.log(products);

let product = products.find( (item) => item.id == productId );


let productsDOM = document.querySelector('.product-item');

productsDOM.innerHTML = `<div>
        <img src="${product.ImagURL}" class="imgdetail" alt="product imgae" />

        <div class="product-item-unit">
            <h2 class="prod-title"> ${product.title} </h2>
            <p class="prod-desc">${product.desc}</p>
            <span class="prod-size"> Size : ${product.size} </span><br>
            <span class="prod-size"> Quantity : ${product.quantity} </span>
        </div>
    </div>
`;