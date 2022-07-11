// setup variables: 
let inputTitle = document.getElementById("inputTitle");
let inputDesc = document.getElementById("inputDesc");
let inputSizeSelect = document.getElementById("product-selection");

let submitBtn = document.getElementById("submitBtn");
let title , desc , size , ImageURL;

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

let newProducts;
submitBtn.addEventListener("click" , function (e){
    e.preventDefault();
    if(inputTitle.value && inputDesc.value && inputSizeSelect.value){
        let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : productsDB;
        // console.log(title , desc , size);
        newProducts = [...products ,
            { id:products.length +1 ,
            title ,
            desc ,
            size ,
            ImagURL: ImageURL ,
            quantity:1 ,
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
let inputFile = document.getElementById("inputFile");

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