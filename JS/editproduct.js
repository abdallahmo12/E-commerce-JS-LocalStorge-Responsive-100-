let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : productsDB;
let productId = localStorage.getItem("editProductID");
let getProduct = products.find(i => i.id == productId);
console.log(getProduct);

let inputTitle = document.getElementById("inputTitle");
let inputDesc = document.getElementById("inputDesc");
let inputSizeSelect = document.getElementById("product-selection");
let inputFile = document.getElementById("inputFile");
let submitBtn = document.getElementById("submitBtn");

let title , desc , size , ImageURL ,quantity;
let newProducts;

inputTitle.value = getProduct.title;
inputDesc.value = getProduct.desc;
inputSizeSelect.value = getProduct.size;
ImageURL = getProduct.ImagURL;

inputTitle.addEventListener("change" , function (e){
    title = e.target.value;
});

inputDesc.addEventListener("change",function(e){
    desc = e.target.value;
});

inputSizeSelect.addEventListener("change",selectSize);

function selectSize(e){
    size = e.target.value;
}

quantity = getProduct.quantity;

submitBtn.addEventListener("click" , function (e){
    e.preventDefault();
    if(inputTitle.value && inputDesc.value && inputSizeSelect.value){
        let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : productsDB;
        newProducts = products.filter(item => item.id !== getProduct.id);

        // console.log(title , desc , size);
        newProducts = [...newProducts ,
            { id : getProduct.id ,
            title ,
            desc ,
            size ,
            ImagURL: ImageURL ,
            quantity ,
            isMe: 'Y',
        }];

        console.log(newProducts);
        localStorage.setItem("products", JSON.stringify(newProducts));
        inputTitle.value= "";
        inputDesc.value = "";
        inputSizeSelect.value = "";

        window.setTimeout(() => {
            window.location ="index.html";
        } , 1000);
    }
    else{
        alert("Please Fill Empty Data");
    }
});







// // setup variables: 




inputFile.addEventListener("change",fetchPicture);

function fetchPicture(){
    let file = this.files[0];
    console.log(file);
    
    let types = ["image/png","image/jpg","image/jpeg"];
    
    if(types.indexOf(file.type) == -1){
        alert("the file type is not allowed to upload , try again with (png OR jpg OR jpeg)");
        return;
    }

    if(file.size > 3 * 1024 * 1024){
        alert("the Image Exceeded the min size (3MG)")
        return;
    }
    getImageBase64(file);
    // ImageURL = URL.createObjectURL(file);
}

function getImageBase64(f){
    let reader = new FileReader();
    
    reader.readAsDataURL(f);

    reader.onload = () =>{
        // console.log(reader.result);
        ImageURL = reader.result;
    }
    reader.onerror= function (){
        console.log("Error !!");
    }
}