// variables
let avatarContainer = document.querySelector(".avatar-container");
let avatar_URL = localStorage.getItem("profileImage") ?  localStorage.getItem("profileImage") : "imges/avatar.png";
let userName = localStorage.getItem("username");
let userEmail = localStorage.getItem("email");
let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : productsDB;
let myProducts = products.filter( i => i.isMe == "Y");
console.log(myProducts);
// setup dom
let usernameDom = document.querySelector("#userName");
let useremailDom = document.querySelector("#userEmail");
let userProductsLength = document.getElementById("personalproducts");
let editprofilebtn = document.getElementById("editprofile");

avatarContainer.innerHTML = `<img src=${avatar_URL} alt="avatar" />`;
usernameDom.innerHTML = userName;
useremailDom.innerHTML = userEmail;

userProductsLength.innerHTML = "Personal Products :" + myProducts.length;


editprofilebtn.addEventListener("click",editProfile);

function editProfile(){
    window.location = "editprofile.html";
}
